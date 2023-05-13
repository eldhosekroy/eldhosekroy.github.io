<?php
if($_POST['username']=='jerry'){
	header ('Location: home.html');
	exit;
}
else{	
	header ('Location: index.html');
	exit;
}
?>
