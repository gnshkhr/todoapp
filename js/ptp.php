<?php
$success = "";
$error_message = "";
$conn = mysqli_connect("localhost","root","","demo");
if(!empty($_POST["submit_email"])) {
$result = mysqli_query($conn,"SELECT * FROM userprofile WHERE email='" . $_POST["email"] . "'");
$count  = mysqli_num_rows($result);
if($count>0) {
// generate OTP
$otp = rand(1000,9999);
// Send OTP
require_once("mail_function.php");
$mail_status = sendOTP($_POST["email"],$otp);

if($mail_status == 1) {
$result = mysqli_query($conn,"INSERT INTO otpstore(otp,is_expired,create_at) VALUES ('" . $otp . "', 0, '" . date("Y-m-d H:i:s"). "')");
$current_id = mysqli_insert_id($conn);
if(!empty($current_id)) {
$success=1;
}
}
} else {
$error_message = "Email
 not exists!";
}
}
if(!empty($_POST["submit_otp"])) {
$result = mysqli_query($conn,"SELECT * FROM otpstore WHERE otp='" . $_POST["otp"] . "' AND is_expired!=1 AND NOW() <= DATE_ADD(create_at, INTERVAL 24 HOUR)");
$count  = mysqli_num_rows($result);
if(!empty($count)) {
$result = mysqli_query($conn,"UPDATE otpstore SET is_expired = 1 WHERE otp = '" . $_POST["otp"] . "'");
$success = 1;	
} else {
$success = 2;
$error_message = "Invalid OTP!";
}	
}
?>
<html>
<head>
<title>User Login</title>
<style>
body{
font-family: calibri;
}
.form_container {
    border: 1px solid rgba(0, 0, 0, .05);
    box-shadow: 15px 26px 30px rgba(0, 0, 0, .09);
    border-left: 1px solid rgba(0, 0, 0, .06);
border-radius: 4px;
max-width: 500px;
padding: 20px 30px 30px;
text-align: center;
margin:0 auto;
}
.sanhead { font-size: 20px; }
.san { padding:20px; }
.error_message {
color: #b12d2d;
text-align: center;
background-color: #ffd9d9;
}
.message {
width: 100%;
max-width: 300px;
padding: 10px 30px;
border-radius: 4px;
margin: 0 auto;
margin-bottom: 5px;    
text-align: center;
}
.inputclass{
border: #CCC 1px solid;
padding: 10px 20px;
border-radius:4px;
}
.submit_button {
padding: 10px 20px;
background: #a9961e;
border: #736615 1px solid;
color: #FFF;
border-radius:4px;
}
</style>
</head>
<body>
<?php
if(!empty($error_message)) {
?>
<div class="message error_message"><?php echo $error_message; ?></div>
<?php
}
?>

<form name="frmUser" method="post" action="">
<div class="form_container">
<?php 
if($success == 1) { ?>
<div class="sanhead">Enter OTP</div>
<p style="color:#31ab00;">Check your email for the OTP</p>
<div class="san">
<input type="text" name="otp" placeholder="One Time Password" class="inputclass" required>
</div>
<div class="sanhead"><input type="submit" name="submit_otp" value="Submit" class="submit_button"></div>
<?php 
} else if ($success == 2) {
$result = mysqli_query($conn,"SELECT * FROM otpstore WHERE otp='" . $_POST["otp"] . "'");

$count=mysqli_num_rows($result);
$row=mysqli_fetch_array($result);

if($count > 0){
session_start();
$_SESSION['newid']=$row['newid'];
header('Location: securepage.php');
}
?>

<?php
}
else {
?>
<div class="sanhead">Enter Your Login Email</div>
<div class="san"><input type="text" name="email" placeholder="Email" class="inputclass" required></div>
<div class="sanhead"><input type="submit" name="submit_email" value="Submit" class="submit_button"></div>
<?php 
}
?>

<a href="register.php">Register Email</a>
</div>
</form>
</body>
</html>