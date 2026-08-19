<?php
// api/leaderboard/create.php
// POST /api/leaderboard/create.php   body (JSON): { "player_name": "...", "score": 100 }
// บันทึกคะแนนใหม่ 1 แถวลงตาราง leaderboard — ถ้าไม่ใส่ชื่อ ระบบตั้งชื่อให้อัตโนมัติ "Player 01", "Player 02", ...

header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../../config/db.php";

$MAX_NAME_LENGTH = 20;

$body = json_decode(file_get_contents("php://input"), true) ?? [];

$score = isset($body["score"]) ? filter_var($body["score"], FILTER_VALIDATE_INT) : null;
if ($score === null || $score === false) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "คะแนนต้องเป็นจำนวนเต็ม"]);
    exit;
}

$playerName = isset($body["player_name"]) ? trim($body["player_name"]) : "";

try {
    if ($playerName === "") {
        $count = (int) $pdo->query("SELECT COUNT(*) AS total FROM leaderboard")->fetch()["total"];
        $playerName = "Player " . str_pad($count + 1, 2, "0", STR_PAD_LEFT);
    }

    if (mb_strlen($playerName) > $MAX_NAME_LENGTH) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "ชื่อผู้เล่นต้องไม่เกิน $MAX_NAME_LENGTH ตัวอักษร"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO leaderboard (player_name, score) VALUES (:name, :score)");
    $stmt->execute([":name" => $playerName, ":score" => $score]);

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "data" => ["id" => $pdo->lastInsertId(), "player_name" => $playerName, "score" => $score],
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "บันทึกคะแนนไม่สำเร็จ"]);
}
?>