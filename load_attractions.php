<?php
try {
  $queryStr = "SELECT id, name, image, web, category,
    ST_AsGeoJSON(ST_Transform(geom,4326),5) as geom FROM lda_attractions ORDER BY name";
  if(isset($_POST['filter'])){
    if($_POST['filter']!=='All'){
      $queryStr = "SELECT id, name, image, web, category,ST_AsGeoJSON(ST_Transform(geom,4326),5) as geom
      FROM lda_attractions WHERE category = '{$_POST['filter']}' ORDER BY name";
    }
  }
  $db = new PDO("pgsql:host=hdevrds.ctrw9wzqmrtp.us-east-1.rds.amazonaws.com;port=5432;dbname=luandawebmap;","luanda","kiand@");
  $sql = $db->query($queryStr);

  $features = [];
  while($row = $sql->fetch(PDO::FETCH_ASSOC)){
    $feature = ['type'=>"Feature"];
    $feature['geometry'] = json_decode($row['geom']);
    unset($row['geom']);
    $feature['properties'] = $row;
    array_push($features, $feature);
  }
  $featureCollection = ['type'=>'FeatureCollection', 'features'=>$features];
  echo json_encode($featureCollection);

} catch (PDOException $e) {

  echo $e->getMessage();

}

 ?>
