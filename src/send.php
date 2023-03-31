<?php
if ( $_POST ) {

  $to      = [
      'inbox@creativesoldiers.ru'
  ];
  $subject = "Заявка с лендинга";
  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "Content-type: text/html; charset=utf-8\r\n";
  $headers .= "From: <mail6@gmail.com>\r\n";

  $message = '<b>Заявка с лендинга ' .  $_SERVER['HTTP_REFERER'] . ':</b><br />
		id: ' . $_POST['id'] . '<br /> 
		Имя: ' . $_POST['name'] . '<br /> 
		E-mail: ' . $_POST['email'] . '<br /> 
		Телефон: ' . $_POST['phone'];

  foreach ( $to as $mailto ) {
    $send = mail( $mailto, $subject, $message, $headers );
  }
}

?>


