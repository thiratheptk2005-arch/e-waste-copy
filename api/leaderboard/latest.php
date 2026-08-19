<?php
// api/leaderboard/latest.php
// GET /api/leaderboard/latest.php?limit=10
// คืนคะแนนล่าสุดที่บันทึก เรียงตามเวลาที่เล่นล่าสุด

header("Content-Type: application/json; charset=utf-8");
require_once __DIR__ . "/../../config/db.php";

$limit = isset($_GET["limit"]) ? (int) $_GET["limit"] : 10;
if ($limit <= 0) $limit = 10;
if ($limit > 100) $limit = 100;

try {
    $stmt = $pdo->prepare(
        "SELECT player_name, score, played_at
         FROM leaderboard
         ORDER BY played_at DESC
         LIMIT :limit"
    );
    $stmt->bindValue(":limit", $limit, PDO::PARAM_INT);
    $stmt->execute();
    echo json_encode(["success" => true, "data" => $stmt->fetchAll()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "โหลดข้อมูลไม่สำเร็จ"]);
}
?>