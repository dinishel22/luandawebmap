<?php
if(isset($_POST['id']) && is_numeric($_POST['id'])){
  $id = $_POST['id'];
} else {
  $id = "-99999";
}
try {
  $db = new PDO("pgsql:host=hdevrds.ctrw9wzqmrtp.us-east-1.rds.amazonaws.com;port=5432;dbname=luandawebmap;","luanda","kiand@");
  $sql = $db->prepare("DELETE FROM lda_attractions WHERE id=:id");
  $params = ["id"=>$id];
  if ($sql-> execute($params)) {
      echo "Attraction succesfully deleted";
  } else {
      echo var_dump($sql->errorInfo());
  }
} catch (PDOException $e) {
  echo $e->getMessage();
}

?>
