<?php
header('Content-Type: application/json; charset=utf-8');

// Pouze POST požadavky
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metoda není povolena']);
    exit;
}

// ===== KONFIGURACE =====
$to      = 'strechykama@seznam.cz';
$subject = 'Nová poptávka z webu KAMA STŘECHY';
// ========================

// Sanitizace vstupu
function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = clean($_POST['phone']   ?? '');
$service = clean($_POST['service'] ?? '');
$message = clean($_POST['message'] ?? '');

// Validace
$errors = [];
if (empty($name))                           $errors[] = 'Jméno je povinné';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Neplatný e-mail';
if (strlen($message) < 10)                  $errors[] = 'Zpráva je příliš krátká';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode('. ', $errors)]);
    exit;
}

// Sestavení e-mailu
$body = "Nová poptávka z webu KAMA STŘECHY\n";
$body .= str_repeat('=', 40) . "\n\n";
$body .= "Jméno:   $name\n";
$body .= "E-mail:  $email\n";
if ($phone)   $body .= "Telefon: $phone\n";
if ($service) $body .= "Služba:  $service\n";
$body .= "\nZpráva:\n$message\n\n";
$body .= str_repeat('-', 40) . "\n";
$body .= "Odesláno: " . date('d.m.Y H:i') . "\n";

$headers  = "From: web@strechykama.cz\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'E-mail se nepodařilo odeslat, zkuste to prosím znovu']);
}
