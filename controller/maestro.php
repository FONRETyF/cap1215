<?php

    session_start();
    require_once "/var/www/html/cap1215/model/Maestro.php";
    $maestro = new Maestro();
    $maestroTramites = new Maestro();
    
    switch ($_GET["op"]) {
        case "buscar":
            $a_get_maestro = $maestro->get_maestro($_POST["clavemae"]);
            if (count($a_get_maestro)>0){
                $a_get_maestro = $maestro->get_maestro($_POST["clavemae"]);
                $a_get_TrmtsHist = $maestroTramites->buscaTrsmitesHist($_POST["clavemae"]);
				
                if(is_array($a_get_maestro)==true and count($a_get_TrmtsHist)==0){
                    foreach($a_get_maestro as $row){
                        $estatLabMae = $row["estatlabmae"];
                    }
                    if ($estatLabMae == "P"){
                        foreach($a_get_maestro as $row){
                            $output["motivo"] = "nuevo";
                            $output["csp"] = $row["csp"];
                            $output["cveissemym"] = $row["cveissemym"];
                            $output["apepatmae"] = $row["apepatmae"];
                            $output["apematmae"] = $row["apematmae"];
                            $output["nommae"] = $row["nommae"];
                            $output["nomcommae"] = $row["nomcommae"];
                            $output["curpmae"] = $row["curpmae"];
                            $output["rfcmae"] = $row["rfcmae"];
                            $output["estatlabmae"] = $row["estatlabmae"];
                        }   
                    }else{
                        foreach($a_get_maestro as $row){
                            $output["motivo"] = "inconsistencia";
                            $output["csp"] = $row["csp"];
                            $output["cveissemym"] = $row["cveissemym"];
                            $output["apepatmae"] = $row["apepatmae"];
                            $output["apematmae"] = $row["apematmae"];
                            $output["nommae"] = $row["nommae"];
                            $output["nomcommae"] = $row["nomcommae"];
                            $output["curpmae"] = $row["curpmae"];
                            $output["rfcmae"] = $row["rfcmae"];
                            $output["estatlabmae"] = $row["estatlabmae"];
                        }   
                    }
                    echo json_encode($output, JSON_FORCE_OBJECT); 

                }else if(count($a_get_TrmtsHist)>0){
                    foreach($a_get_TrmtsHist as $row){
                        $output["motivo"] = "existente";
                        $output["cvemae"] = $row["cvemae"];
                        $output["motvret"] = $row["motvret"];
                        $output["fechentrega"] = $row["fechentrega"];
                    }
                    echo json_encode($output, JSON_FORCE_OBJECT); 
                }
            }
            break;
        
        case 'buscarJub':
            $a_get_maestroJub = $maestro->get_maestroJub($_POST["claveisemym"]);
            if (count($a_get_maestroJub)>0){
                $a_getMaeJubMutualidad = $maestro->get_maestroMutualidad($_POST["claveisemym"]);
                foreach($a_getMaeJubMutualidad as $row){
                        $output["motivo"] = "nuevo";
                        $output["cveissemym"] = $row["cveissemym"];
                        $output["apepatmae"] = $row["apepatmae"];
                        $output["apematmae"] = $row["apematmae"];
                        $output["nommae"] = $row["nommae"];
                        $output["nomcommae"] = $row["nomcommae"];
                        $output["curpmae"] = $row["curpmae"];
                        $output["rfcmae"] = $row["rfcmae"];
                        $output["fechbajamae"] = $row["fechbajamae"];
                        $output["estatusjub"] = $row["estatmutual"];
                        $output["programafallec"] = "M";
                    } 
                    echo json_encode($output, JSON_FORCE_OBJECT);
            }
            break;

        case 'insertMae':
            $a_get_insertMae = $maestro->insertMae($_POST['csp'],$_POST['cveissemym'],$_POST['apepat'],$_POST['apemat'],$_POST['nombre'],$_POST['nomcom'],$_POST['curp'],$_POST['rfc'],$_POST['region'],$_SESSION['usuario']);
            echo json_encode($a_get_insertMae, JSON_FORCE_OBJECT);
            break;
            
        default:
            # code...
            break;
    }

?>