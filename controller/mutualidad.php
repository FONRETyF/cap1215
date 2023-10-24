<?php
    session_start();
    require_once "/var/www/html/cap1215/model/Mutualidad.php";
    $mutualidad = new Mutualidad();

    switch ($_GET["op"]) {
        case "listar":
            $a_get_emisMut = $mutualidad->get_emisiones();
            $a_EmisionesMut = Array();
            foreach($a_get_emisMut as $row){
                $a_prep_emisiones = array();
                $a_prep_emisiones[] = $row["numemision"];
                $a_prep_emisiones[] = $row["anioemision"];
                $a_prep_emisiones[] = $row["descemision"];
                $a_prep_emisiones[] = $row["numafis"];
                if ($row["estatemi"]=="C") {
                    $estatEmision= "disabled";
                    $estatusEmision = "CERRADA";
                }else {
                    $estatEmision= "enabled";
                    $estatusEmision = "ACTIVA";
                }
                $a_prep_emisiones[] = $estatusEmision;
                $a_prep_emisiones[] = "<button type='button' onclick='editar(".$row['idemision'].");' id='".$row['idemision']."'class='BtIcEdit' ".$estatEmision."><div><img src='../../img/file.png' alt='modificar' title='modificar' height='20' width='20'></div></button>";
                $a_prep_emisiones[] = "<button type='button' onclick='detalleEmision(".$row['idemision'].");'  id='".$row['idemision']."'class='BtIcDetail'><div><img src='../../img/lapiz.png' alt='editar-capturar' title='editar-capturar' height='18' width='18'></div></button>";
                $a_prep_emisiones[] = "<button type='button' onclick='eliminar(".$row['idemision'].");'  id='".$row['idemision']."'class='BtIcDelete'".$estatEmision."><div><img src='../../img/goma-de-borrar.png' alt='eliminar' title='eliminar' height='17' width='17'></div></button>";
                $a_EmisionesMut[] = $a_prep_emisiones;  
            }
            $a_result_emisiones_DT = array(
                "sEcho"=> 1,
                "iTotalRecords"=>count($a_EmisionesMut),
                "iTotalDisplayRecords"=>count($a_EmisionesMut),
                "aaData"=>$a_EmisionesMut);
            echo json_encode($a_result_emisiones_DT);
            break;
        
        case 'listarS':
            $a_get_solicsMut = $mutualidad->get_solicitudes($_GET["idemision"]);
            $a_SolicitudesMut = Array();
            $idSolic = 0;
            foreach($a_get_solicsMut as $row){
                $idSolic = $idSolic + 1;
                $a_prep_solicis = array();
                $a_prep_solicis[] = $idSolic;
                $a_prep_solicis[] = $row["cveissemym"];
                $a_prep_solicis[] = $row["nomcommae"];
                $a_prep_solicis[] = $row["fechafimutu"];
                if ($row["estatmutual"]=="A") {
                    $estatusMut = "ACTIVO";
                }elseif ($row["estatmutual"]=="P") {
                    $estatusMut = "PENDIENTE DESC";
                }
                $a_prep_solicis[] = $estatusMut;
                $a_prep_solicis[] = "<button type='button' onclick='editarSolic(".$row['idcapmutu'].");' id='".$row['idcapmutu']."'class='BtIcEdit'><div><img src='../../img/file.png' alt='modificar' title='modificar' height='20' width='20'></div></button>";
                $a_prep_solicis[] = "<button type='button' onclick='detalleSolic(".$row['idcapmutu'].");'  id='".$row['idcapmutu']."'class='BtIcDetail'><div><img src='../../img/lapiz.png' alt='editar-capturar' title='editar-capturar' height='18' width='18'></div></button>";
                $a_prep_solicis[] = "<button type='button' onclick='eliminarSolic(".$row['idcapmutu'].");'  id='".$row['idcapmutu']."'class='BtIcDelete'><div><img src='../../img/goma-de-borrar.png' alt='eliminar' title='eliminar' height='17' width='17'></div></button>";
                $a_SolicitudesMut[] = $a_prep_solicis;  
            }
            $a_result_solics_DT = array(
                "sEcho"=> 1,
                "iTotalRecords"=>count($a_SolicitudesMut),
                "iTotalDisplayRecords"=>count($a_SolicitudesMut),
                "aaData"=>$a_SolicitudesMut);
            echo json_encode($a_result_solics_DT);
            break;
        
        case 'agregar':
            $a_get_emisionMut = $mutualidad->get_emision_id($_POST["idemision"]);
            $resulInsert = array();
            if(empty($a_get_emisionMut)){
                if(is_array($a_get_emisionMut)==true && count($a_get_emisionMut)==0){
                    $result_insertEmision = $mutualidad->insert_emision($_POST["idemision"],$_POST["numemision"],$_POST["anioemision"],$_POST["fechEmision"],$_SESSION['usuario'],$_POST["descemision"],$_POST["observemi"]);
                }
            }else{
                $resulInsert["resultado"] = "Existente";
            }
            echo json_encode($resulInsert);
            break;
        
        case "updateEmi":
            $result_insertEmision = $mutualidad->update_emision($_POST["idemision"],$_POST["numemision"],$_POST["anioemision"],$_POST["fechEmision"],$_SESSION['usuario'],$_POST["descemision"],$_POST["observemi"]);
            echo json_encode($result_insertEmision);
            break;
            
        case "mostrar":
            $a_get_emision = $mutualidad->get_emision_id($_POST["idemision"]);
            if(is_array($a_get_emision)==true && count($a_get_emision)>0){
                foreach($a_get_emision as $row){
                    $output["idemision"] = $row["idemision"];
                    $output["numemision"] = $row["numemision"];
                    $output["anioemision"] = $row["anioemision"];
                    $output["descemision"] = $row["descemision"];
                    $output["fechemision"] = $row["iniresepcion"];
                    $output["observemision"] = $row["observemi"];
                }
                echo json_encode($output);
            }
            break;

        case "eliminar":
            $mutualidad->delete_emision($_POST["idemision"]);
            break;

        case 'buscaEdoCta':
            $claveMaeJub = $_POST["cveissemym"];
            $get_programmaeJub = $mutualidad->getprogramJub($claveMaeJub);
            $get_edoctamae = $mutualidad->getEdoCtaJub($claveMaeJub,$get_programmaeJub[0]["programfallec"],$_SESSION['usuario']);
            $output["nomcomjub"] = $get_programmaeJub[0]["nomcomjub"];
            $output["numaport"] = $get_edoctamae[0]["numaport"];
            $output["anioultaport"] = $get_edoctamae[0]["anioultaport"];
            echo json_encode($output);
            break;
        
        case 'updateEdoCta':
            $get_updateEdoCta = $mutualidad->updateEdoCtaMut($_POST["cveissemym"],$_POST["numaportant"],$_POST["numaport"],$_POST["anioultaport"],$_SESSION['usuario']);
            //echo json_encode($get_updateEdoCta, JSON_FORCE_OBJECT);
            echo json_encode($get_updateEdoCta);
            break;

    }   

?>