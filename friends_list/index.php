<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<!-- THESE ARE THE IMPORTANT IMPORTS -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="friends_list.css" />


<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Pandere Friends</title>


<!--- javascript and jquery events --->
<script src="friends_list.js" type="text/javascript"></script>

<!--- Get facebook info:  friends, likes, permissions, basic user info --->
<?php 
	// These are for Tim's Pandere Prototyping
	// XXX: REPLACE US WITH RETAILDETAIL KEYS
   $app_id = '164363886993897';
   $app_secret = 'dc86b7b396b4d71d05118b8ad10ef2f5';
   
	function get_facebook_token($app_id, $app_secret) {
		$args = array();
		parse_str(trim($_REQUEST['fbs_' . $app_id], '\\"'), $args);
		//ksort($args);
		return $args['access_token'];
	}
	
	$token = get_facebook_token($app_id, $app_secret);
   
    if($token){
		$fb_url = 'https://graph.facebook.com/me';
		$user_data = json_decode(file_get_contents("$fb_url?access_token=$token"));
		$user_likes = json_decode(file_get_contents("$fb_url/likes?access_token=$token"));
		$user_friends = json_decode(file_get_contents("$fb_url/friends?access_token=$token"));
		$user_permissions = json_decode(file_get_contents("$fb_url/permissions?access_token=$token"));
	}
?>
</head>

<body>

<!--- Create the friends list --->
<div id="rd_friends">
<? 
// consider using jQuery.parseJSON
//example json reading
//$obj = json_decode($json);
//print $obj->{'foo-bar'};
//$json = file_get_contents(FACEBOOK GOES HERE);

// make jquery dropzone
// drop and make alert box
// use a div with classname workspace
// 

// Faked facebook API data + faked database results
$json = array(
'{"name":"Julie Bae",
"action":"Made the workspace ",
"workspace":"\"Girls Only Snow trip\"",
"id":"425952"}',
'{"name":"Tim Andrianoff",
"action":"Shared the workspace ",
"workspace":"\"Best Cheese\"",
"id":"4804226"}',
'{"name":"John Michael Flowers",
"action":"Made the workspace ",
"workspace":"\"iPhone or iPad\"",
"id":"7906859"}',
'{"name":"John Horstman",
"action":"Checked out ",
"workspace":"the Vodaphone storefront!",
"id":"730413060"}');

// Loop through fake friends data
for ($i = 0; $i < count($json); $i++) {
	$friend_info = json_decode($json[$i]); // decode friend info json entry
	echo '<div class="friend_list_entry" fbid='.$friend_info->{'id'}.' >'; // containing div for picture and friend info
	echo '<img class="friend_icon" src="http://graph.facebook.com/'.$friend_info->{'id'}.'/picture" />'; // get friend facebook pic
	echo '<div>';
	echo '<span class="friend_name">'.$friend_info->{'name'}.'</span><br />'.$friend_info->{'action'}.'<span class="workspace">'.$friend_info->{'workspace'}.'</span>';
	echo '</div>';		
	echo '</div>';
}
?>
</div>
<div id="card" class="card">
<!-- XXX: The friend card shows up here. You may need to control its position better. -->
</div>
<div class="friend_drop_zone"> 
<!-- XXX:This is the Drop zone for a friend list entry.-->
</div>
</body>
</html>