// JavaScript Document

var showCard = true; // This variable keeps track of whether or not the user card should be shown. it is disabled when the user drags

$(document).ready(
function() {
	$('.card').hide('0'); // at start, hide the card. This could be better, as it still shows
	
	// hide the card when dragging a friend
	$('#rd_friends').mousedown(function(){
			showCard  = false;
			$('.card').hide();
		});
	
	// User Card shows once dragging is done.	
	$('#rd_friends').mouseup(function(){
		showCard  = true;
	});
		
	// show friend card when over their name, hide when gone.
	$('#rd_friends').hover(
		function() { 
			if (showCard) {
			$('.card').show('fast');
			}
		},
		function() { 
			$('.card').hide('fast');
		}
	);

	// Make friend list items draggable
	$('.friend_list_entry').draggable({
		helper: 'clone',
        stop: function (ev, ui) {} // What occurs when dragging stops.		
	   });


	$('.friend_drop_zone').droppable({
		/*XXX: This is where you should trigger the add user popup.*/
		//accept:".friend_list_entry", // This limits the drop zone to only accepting .friend_list_entry items
		drop:function(event,ui) {
			var draggedItem = ui.draggable; // get the dragged friend list entry, which contains user info
			var draggedFBid = draggedItem.attr('fbid'); // get the dragged friend's facebook id
			// construct the url for getting the ffriend's picture
			var userPictureUrl = "<img src=\"http://graph.facebook.com/"+draggedFBid+"/picture/\" />"; 
			$('.friend_drop_zone').html(userPictureUrl); // set the contents of the card.	
		}
	});


	// detect mousover friend in friends list to show user info card
	$('.friend_list_entry').hover(
		function (event) {
			// XXX: CREATE THE USER CARD IN HERE
			// building up the content of the user card.
				var fbid = $(this).attr('fbid'); // friend's facebook id
				var URL = "http://graph.facebook.com/"+fbid+"/";
				$.getJSON(URL,function(data) {
					
					// data contains the user's basic info: name, birthday etc.
					// details at http://developers.facebook.com/docs/reference/api/user/
					// example at http://graph.facebook.com/425952
					
					var fbid = data.id;
					var friendName = data.name;
					
					var cardContent = fbid;
					cardContent = "http://graph.facebook.com/"+cardContent+"/picture/";
					cardContent = "<img class=\"card_friend_icon\" src=\""+cardContent+"\" />";
					cardContent = cardContent+"<p>"+friendName+"</p>";
					
					$('.card').html(cardContent);	
				});;
		},
		function(){
				
		}
	);
}
);