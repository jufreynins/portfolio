<?php
declare(strict_types=1);

// Where project inquiries get sent. Update this if the recipient email ever changes.
$recipientEmail = 'jufreyninobayog@gmail.com';

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $payload): never {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

// Honeypot: real visitors never fill this hidden field. Silently "succeed" for bots
// so they don't learn the field is being checked.
if (!empty($_POST['company'])) {
    respond(200, ['ok' => true]);
}

function field(string $key): string {
    return trim((string) ($_POST[$key] ?? ''));
}

$name = field('name');
$email = field('email');
$business = field('business');
$currentWebsite = field('current_website');
$projectType = field('project_type');
$timeline = field('timeline');
$budget = field('budget');
$message = field('message');

$errors = [];
if ($name === '') {
    $errors[] = 'Name is required.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}
if ($message === '') {
    $errors[] = 'Project description is required.';
}

if ($errors) {
    respond(400, ['ok' => false, 'error' => implode(' ', $errors)]);
}

function clean(string $value): string {
    // Strip anything that could inject extra mail headers.
    return str_replace(["\r", "\n"], ' ', $value);
}

$subject = 'New project inquiry from ' . clean($name);

$body = "You have a new project inquiry from your website contact form.\n\n"
    . "Name: {$name}\n"
    . "Email: {$email}\n"
    . 'Company/Business: ' . ($business !== '' ? $business : '—') . "\n"
    . 'Current Website: ' . ($currentWebsite !== '' ? $currentWebsite : '—') . "\n"
    . 'Project Type: ' . ($projectType !== '' ? $projectType : '—') . "\n"
    . 'Target Timeline: ' . ($timeline !== '' ? $timeline : '—') . "\n"
    . 'Estimated Budget: ' . ($budget !== '' ? $budget : '—') . "\n\n"
    . "Project Description:\n{$message}\n";

$host = clean($_SERVER['HTTP_HOST'] ?? 'localhost');
$fromAddress = 'noreply@' . preg_replace('/^www\./', '', $host);

$headers = [
    'From: ' . $fromAddress,
    'Reply-To: ' . clean($email),
    'Content-Type: text/plain; charset=utf-8',
];

$sent = mail($recipientEmail, clean($subject), $body, implode("\r\n", $headers));

if (!$sent) {
    respond(502, ['ok' => false, 'error' => 'The message could not be sent. Please try again or email directly.']);
}

respond(200, ['ok' => true]);
