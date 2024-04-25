<?php 
    $name = filter_input(INPUT_POST, 'name');
    $email = filter_input(INPUT_POST, 'email');
    $phone = filter_input(INPUT_POST, 'phone');
    $website = filter_input(INPUT_POST, 'website');
    $message = filter_input(INPUT_POST, 'message');


    if(!empty($email) && !empty($message)){
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            $receiver = "brookekanonik@gmail.com";
            $subject = "From: $name <$email>" ;//subject of the email
            $body = "Name: $name\nEmail: $email\nPhone: $phone\nWebsite: $website\nMessage: $message\n\nRegards, \n$name";
            $sender = "From: $email";
            if(mail($receiver, $subject, $body, $sender)){
                echo 'Your message has been sent!';
            }else{
                echo 'Sorry, failed to send your message!';
            }
        }else {
            echo 'Enter a valid email address!';
        }
    }else{
        echo 'Email and password field is required!';
    }
?>