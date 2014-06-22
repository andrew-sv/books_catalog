// Create Singleton object
var catalog = {
	// define list item template with named tokens
	listTemplate: '<li class="record">\
						<img class="record-icon" src="{icon}" />\
						<a href="{url}" class="record-link">{name}</a>\
					</li>',
	booksList: [], // list of books data
	init: function(data) {
		var self = this;	// copy reference of self object
		this.booksList = data; // init model
		this.createList(this.booksList); // put list to HTML list
		// bind event listeners
		document.querySelector('.button').onclick = function() {
			self.filter(document.getElementById('searchText').value);
		}
	},

	createList: function(list) {
		var ulElem = document.getElementById('recordsList'); // get UL container
		var sHtml = ''; // create string to collect HTML entry
		for ( var i = 0; i < list.length; i++ ) {
			sHtml += this.listTemplate.format( list[i] ); // add LI HTML to the list
		}
		ulElem.innerHTML = sHtml; // update HTML in the DOM
	},

	filter: function(token) {
		var reg = new RegExp( token, 'i' ); // create regular expression based on input 
		// filter model by name
		var filteredList = this.booksList.filter( function(x) {
			return reg.test(x.name);
		});
		// update the list
		this.createList(filteredList);
	} 

}

// initialize catalog when body is loaded
document.body.onload = function() {
	catalog.init(data);
}

// extend String prototype with format function
// it replaces {property} strings with tokens.property values 
String.prototype.format = function(tokens) {
	var result = this;
	for( var name in tokens ) {
		var reg = new RegExp( '\\{' + name + '\\}', 'g' );
		result = result.replace( reg, tokens[name] );
	}
	return result;
}

// simple
/*function init() {
    var ulElem = document.getElementById('recordsList');
	var sHtml = '';
	for ( var i = 0; i < data.length; i++ ) {
		sHtml += format( template, data[i].icon, data[i].url, data[i].name )
	}
	ulElem.innerHTML = sHtml;
}

function format(src, tokens) {
	var result = src;
	for( var name in tokens ) {
		var reg = new RegExp( '\\{' + name + '\\}', 'g' );
		result = result.replace( reg, tokens[name] );
	}
	return result;
}

function doSearch() {
	var token = document.getElementById('searchText').value;
	var reg = new RegExp( token, 'i' )
	var sHtml = '';
	for ( var i = 0; i < data.length; i++ ) {
		if ( data[i].name.search( reg ) > -1 ) {
			sHtml += format( template, data[i].icon, data[i].url, data[i].name )
		}
	}
	document.getElementById('recordsList').innerHTML = sHtml;
}*/