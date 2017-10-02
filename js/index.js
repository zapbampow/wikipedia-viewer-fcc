//Clicking on search icon hides the icon and brings up the search box
$("#start-box").on("click", "#search-icon",
	function() {
  	$("#search-icon").hide('scale',{ percent: 0 },400, function() {
		$("#search-form-div").show('scale',{ percent: 0 },400);
	});
});

//Clicking on the "Click the icon" text also causes the icon to hide and brings up the search box
$("#start-box").on("click", "#click-to-search",
	function() {
  	$("#search-icon").hide('scale',{ percent: 0 },400, function() {
		$("#search-form-div").show('scale',{ percent: 0 },400);
	});
});

//Clicking on the "x" in the search box hides the search box and brings up the search icon
$("#start-box").on("click", "#delete-button", 
	function() {
  	$("#wikiContent").hide();
		$("#search-form-div").hide('size',{ percent: 0 },400, function() {
			$("#search-icon").show('size',{ percent: 0 }, 400)
		});
		
});

//If enter is pressed while focused in the search field, gets entered text, sends to Wikipedia API, etc.
$("#search-form").keypress(function(event) {
    if(event.which == 13) {
			$("#wikiContent").empty();  //Empty #wikiContent div to fill with new content form search
			
			$("#search-form").val();  //Get Search term
			var searchTerm = document.getElementById("search-form").value; 
			//console.log(searchTerm); 
			
			//Move the search box content to the top of the page
			$("#wikiContent").removeClass("hidden");

			//Set address to ask for info from wikipedia
			var jsonAddress = "https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + searchTerm + "&gpslimit=10&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=50&pilimit=10&redirects=&wbptterms=description&format=json&callback=?";
			
			console.log(jsonAddress);
			
			//Go to JSON address. Go through the listings. Create a new div for each listing with the title and the snippet. Wrap it all in a link. Or at least that's what I'm trying to do. I can't verify that I'm actually getting the information.
			$.getJSON(jsonAddress, function (json) {
				var pageURL;
				var pageTitle;
				var pageInfo;
				var pageImageURL;
				
				//console.log(json.query.pages[1].pageid);
				
				for (i = 0; i < json.query.pages.length; i++) {
					if(json.query.pages[i].thumbnail && json.query.pages[i].terms) {
						pageURL = "https://en.wikipedia.org/?curid=" + json.query.pages[i].pageid;
						pageTitle = json.query.pages[i].title;
						pageInfo = json.query.pages[i].terms.description[0];
						pageImageURL = json.query.pages[i].thumbnail.source;	
						
						$("<a href = '" + pageURL + "'> <div class='aResult'><h4>" + pageTitle + "</h4><p><img class='thumbnail' src='" + pageImageURL + "'>" + pageInfo + "</p></div></a>").appendTo("#wikiContent");
					}
					
					else if (json.query.pages[i].terms){		
						pageURL = "https://en.wikipedia.org/?curid=" + json.query.pages[i].pageid;
						pageTitle = json.query.pages[i].title;
						pageInfo = json.query.pages[i].terms.description[0];
						
						$("<a href = '" + pageURL + "'> <div class='aResult'><h4>" + pageTitle + "</h4><p><img scr = 'https://www.dropbox.com/s/ffoo7oc38m6oa6t/no-photo.png?raw=1'>" + pageInfo + "</p></div></a>").appendTo("#wikiContent");
					}
					
					else if (json.query.pages[i].thumbnail) {
						pageURL = "https://en.wikipedia.org/?curid=" + json.query.pages[i].pageid;
						pageTitle = json.query.pages[i].title;
						pageImageURL = json.query.pages[i].thumbnail.source;	
						
						$("<a href = '" + pageURL + "'> <div class='aResult'><h4>" + pageTitle + "</h4><p><img class='thumbnail' src='" + pageImageURL + "'></p></div></a>").appendTo("#wikiContent");
					}
					
					else {
						pageURL = "https://en.wikipedia.org/?curid=" + json.query.pages[i].pageid;
						pageTitle = json.query.pages[i].title;
						
						$("<a href = '" + pageURL + "'> <div class='aResult'><h4>" + pageTitle + "</h4><p><img scr = 'https://www.dropbox.com/s/ffoo7oc38m6oa6t/no-photo.png?raw=1'></p></div></a>").appendTo("#wikiContent");
					}

    
};
		});
		}
});