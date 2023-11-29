<?php
    session_start();
    require_once "/var/www/html/cap1215/model/Retiros.php";
    $retiro = new Retiros();

    require_once "/var/www/html/cap1215/model/Tramites.php";
    $tramite = new Tramite();

    switch ($_GET["op"]) {
        case "listar":
            $a_get_retiros = $retiro->get_retiros($_GET["identrega"]);
            $a_Prep_Retiros = Array();
            $a_Retiros = Array();
            $a_get_statentr = $retiro->get_EntRet($_GET["identrega"]);
            if ($a_get_statentr=="CERRADA") {
                $estatEntrega= "disabled";
            }else {
                $estatEntrega= "enabled";
            }

            foreach($a_get_retiros[0] as $row){
                $a_prep_retiros = array();
                $a_prep_retiros['identret'] = $row["identret"];
                $a_prep_retiros['cvemae'] = $row["cvemae"];
                $a_prep_retiros['motvret'] = $row["motvret"];
                $a_prep_retiros['nomcommae'] = $row["nomcommae"];
                $a_prep_retiros['montrettot'] = $row["montrettot"];
                $a_prep_retiros['folcheque'] = $row["folcheque"];
                $a_prep_retiros['estattramite'] = $row["estattramite"];
                $a_prep_retiros['btnE'] = "<button type='button' onclick='editarH(".$row['identret'].");' id='".$row['identret']."'class='BtIcEdit' ".$estatEntrega."><div><img src='../../img/lapiz.png' alt='edita' title='editar' height='20' width='20'></div></button>";
                $a_prep_retiros['btnM'] = "<button type='button' onclick='mostrarH(".$row['identret'].",".$row["cvemae"].")'  id='".$row['identret']."'class='BtIcDetail' ".$estatEntrega."><div><img src='../../img/file.png' alt='muestra' title='mostrar' height='20' width='20'></div></button>";
                $a_prep_retiros['btnD'] = "<button type='button' onclick='eliminarH(".$row['identret'].",".$row['cvemae'].");'  id='".$row['identret']."'class='BtIcDelete' ".$estatEntrega."><div><img src='../../img/goma-de-borrar.png' alt='eliminar' title='eliminar' height='21' width='21'></div></button>";
                $a_Prep_Retiros[] = $a_prep_retiros;
            }

            foreach($a_get_retiros[1] as $rowF){
                $a_prep_retirosF = array();
                $a_prep_retirosF['identret'] = $rowF["identret"];
                $a_prep_retirosF['cvemae'] = $rowF["cvemae"];
                $a_prep_retirosF['motvret'] = $rowF["motvret"];
                $a_prep_retirosF['nomcommae'] = $rowF["nomcommae"];
                $a_prep_retirosF['montrettot'] = $rowF["montrettot"];
                $a_prep_retirosF['folcheque'] = "0";
                $a_prep_retirosF['estattramite'] = $row["estattramite"];
                $a_prep_retirosF['btnE'] = "<button type='button' onclick='editarH(".$rowF['identret'].");' id='".$rowF['identret']."'class='BtIcEdit' ".$estatEntrega."><div><img src='../../img/lapiz.png' alt='edita' title='editar' height='20' width='20'></div></button>";
                $a_prep_retirosF['btnM'] = "<button type='button' onclick='mostrarH(".$rowF['identret'].",".$rowF["cvemae"].")'  id='".$rowF['identret']."'class='BtIcDetail' ".$estatEntrega."><div><img src='../../img/file.png' alt='muestra' title='mostrar' height='20' width='20'></div></button>";
                $a_prep_retirosF['btnD'] = "<button type='button' onclick='eliminarH(".$row['identret'].",".$row['cvemae'].");'  id='".$row['identret']."'class='BtIcDelete' ".$estatEntrega."><div><img src='../../img/goma-de-borrar.png' alt='eliminar' title='eliminar' height='21' width='21'></div></button>";
                $a_Prep_Retiros[] = $a_prep_retirosF;
            }

            foreach ($a_Prep_Retiros as $key => $preRet) {
                $aux[$key] = $preRet['identret'];
            }

            array_multisort($aux, SORT_DESC,$a_Prep_Retiros);

            foreach($a_Prep_Retiros as $rowRet){
                $a_prep_retirosOrd = array();
                $a_prep_retirosOrd[] = $rowRet["cvemae"];
                $a_prep_retirosOrd[] = $rowRet["motvret"];
                $a_prep_retirosOrd[] = $rowRet["nomcommae"];
                $a_prep_retirosOrd[] = $rowRet["montrettot"];
                $a_prep_retirosOrd[] = $rowRet["folcheque"];
                $a_prep_retirosOrd[] = $rowRet["estattramite"];
                $a_prep_retirosOrd[] = $rowRet["btnE"];
                $a_prep_retirosOrd[] = $rowRet["btnM"];
                $a_prep_retirosOrd[] = $rowRet["btnD"];
                $a_Retiros[] = $a_prep_retirosOrd;
            }

            $a_result_retiros_DT = array(
                "sEcho"=> 1,
                "iTotalRecords"=>count($a_Retiros),
                "iTotalDisplayRecords"=>count($a_Retiros),
                "aaData"=>$a_Retiros);
            echo json_encode($a_result_retiros_DT);
            break;
/*********************************************************************************************/ 
        case 'buscaEnt':
            $a_get_EntRet = $retiro->get_EntRet($_POST["identrega"]);
            $a_estatentrega ["EstatEnt"] = $a_get_EntRet;
            echo json_encode($a_estatentrega);
            break;

        case "deleteTramite":
            $a_deleteTram = $retiro->deleteTram($_POST["identret"],$_POST["cvemae"],$_SESSION['usuario']);
            echo json_encode($a_deleteTram);
            break;

        case 'getTram':
            $a_get_tram_id = $tramite->get_Tram_Id($_POST['identret']);
            foreach($a_get_tram_id as $row){
                $output["motvret"] = $row["motvret"];
                $output["modretiro"] = $row["modretiro"];
                $output["cvemae"] = $row["cvemae"];
            }
            echo json_encode($output, JSON_FORCE_OBJECT);
            break;

        case 'mostrarJI':
            $a_get_DT_JI = $retiro->get_infoDTJI($_POST['identret'],$_POST['modretiro'],$_POST['cvemae'],$_POST['motivoRet']);
            foreach ($a_get_DT_JI as $row) {
                $output["cvemae"] =$row["cvemae"];
                $output["motvret"] =$row["motvret"];
                $output["fechbajfall"] =$row["fechbajfall"];
                $output["nommae"] =$row["nomcommae"];
                $output["modretiro"] =$row["modretiro"];
                $output["montrettot"] =$row["montrettot"];
                $output["montretentr"] =$row["montretentr"];
                $output["montretfall"] =$row["montretfall"];
                $output["fechrecib"] =$row["fechrecib"];
                $output["fechentrega"] =$row["fechentrega"];
                $output["estattramite"] =$row["estattramite"];
                $output["fcbasemae"] =$row["fcbasemae"];
                $output["numpsgs"] =$row["numpsgs"];
                $output["diaspsgs"] =$row["diaspsgs"];
                $output["aservactmae"] =$row["aservactmae"];
                $output["folcheque"] =$row["folcheque"];
                $output["estatcheque"] =$row["estatcheque"];
                $output["observtrami"] =$row["observtrami"];
            }

            echo json_encode($output, JSON_FORCE_OBJECT);
            break;

        case 'mostrarFJ':
            $a_get_DT_FJ = $retiro->get_infoDTFJ($_POST['identret'],$_POST['modretiro'],$_POST['cvemae'],$_POST['motivoRet']);
            foreach ($a_get_DT_FJ as $row) {
                $output["cvemae"] =$row["cvemae"];
                $output["motvret"] =$row["motvret"];
                $output["fcfallecmae"] =$row["fcfallecmae"];
                $output["nommae"] =$row["nomcommae"];
                $output["modretiro"] =$row["modretiro"];
                $output["montrettot"] =$row["montrettot"];
                $output["montretentr"] =$row["montretentr"];
                $output["montretfall"] =$row["montretfall"];
                $output["fechrecib"] =$row["fechrecib"];
                $output["fechentrega"] =$row["fechentrega"];
                $output["estattramite"] =$row["estattramite"];
                $output["fechbajamae"] =$row["fechbajamae"];
                $output["aniosjub"] =$row["aniosjub"];
                $output["observtrami"] =$row["observtrami"];
            }

            echo json_encode($output, JSON_FORCE_OBJECT);
            break;

        case 'busqbenefs':
            $a_get_benefs =  $retiro->get_benefs($_POST['cvemae']);
            $a_beneficiarios = array();
            foreach ($a_get_benefs as $row) {
                $a_prep_benefs = array();
                $a_prep_benefs[] = $row["idbenef"];
                $a_prep_benefs[] = $row["nombenef"];
                $a_prep_benefs[] = $row["curpbenef"];
                $a_prep_benefs[] = $row["parentbenef"];
                $a_prep_benefs[] = $row["porcretbenef"];
                $a_prep_benefs[] = $row["edadbenef"];
                $a_prep_benefs[] = $row["vidabenef"];
                $a_prep_benefs[] = $row["folcheque"];
                $a_prep_benefs[] = $row["estatcheque"];
                $a_prep_benefs[] = $row["fechcheque"];
                $a_beneficiarios[] = $a_prep_benefs;
            }
            echo json_encode( $a_beneficiarios,JSON_FORCE_OBJECT);
            break;

        case 'updateTram':
            $a_get_DT_JIFA = $retiro->get_infoDTJI($_POST['identret'],$_POST['modretiro'],$_POST['cvemae'],$_POST['motivoRet']);
            echo json_encode($a_get_DT_JIFA,JSON_FORCE_OBJECT);
            break;

        case 'updateTramFJ':
            $a_get_DT_FJ = $retiro->get_infoDTFJ($_POST['identret'],$_POST['modretiro'],$_POST['cvemae'],$_POST['motivoRet']);
            echo json_encode($a_get_DT_FJ,JSON_FORCE_OBJECT);
            break;

        case 'updateBenefs':
            $a_get_DT_Benefs = $retiro->get_datsBenefs($_POST['identret'],$_POST['cvemae']);
            echo json_encode($a_get_DT_Benefs,JSON_FORCE_OBJECT);
            break;
		
        default:
            break;
    }

?>
