<?php
    session_start();

    require_once "/var/www/html/cap1215/model/Tramites.php";
    $tramite = new Tramite();

    switch ($_GET["op"]) {
        case 'obtenRetiro':
            $a_get_paramRet = $tramite->get_Retiro($_POST["aniosserv"],$_POST["fechBaja"]);
            if(is_array($a_get_paramRet)==true && count($a_get_paramRet)>0){
                foreach($a_get_paramRet as $row){
                    $output["montret"] = $row["montRet"];
                }
                echo json_encode($output, JSON_FORCE_OBJECT);
            }
            break;
        
        case 'obtenRetiroJub':
            $a_get_paramRetJub = $tramite->get_RetiroJub($_POST["aniosserv"],$_POST["programF"]);
            if(is_array($a_get_paramRetJub)==true && count($a_get_paramRetJub)>0){
                foreach($a_get_paramRetJub as $row){
                    $output["montret"] = $row["montRet"];
                }
                echo json_encode($output, JSON_FORCE_OBJECT);
            }
            break;

        case 'agregar':
            $a_addtramHist = $tramite -> addTramiteJI_Hist($_POST['Ianioentr'],$_POST['Inumentr'],$_POST['Iidentr'],$_POST['Icvemae'],$_POST['Icveissemym'],$_POST['Imotret'],$_POST['Iapepat'],$_POST['Iapemat'],$_POST['Inombre'],$_POST['Inomcom'],$_POST['IRegMae'],$_POST['InumDictam'],$_POST['IfechDictam'],$_POST['Ifechbaj'],$_POST['InomSolic'],$_POST['Ifechbase'],$_POST['IaniosServ'],$_POST['Imonttotret'],$_POST['IfechRecibido'],$_POST["Icurpmae"],$_POST["Irfcmae"],$_POST["IObserv"],$_POST["IFolCheq"],$_SESSION['usuario']);
            echo json_encode($a_addtramHist, JSON_FORCE_OBJECT);
            break;

        case 'agregarF':
            $a_addTramFHist = $tramite -> addtramiteF_Hist($_POST['Ianioentr'],$_POST['Inumentr'],$_POST['Iidentr'],$_POST['Icvemae'],$_POST['Icveissemym'],$_POST['Imotret'],$_POST['Iapepat'],$_POST['Iapemat'],$_POST['Inombre'],$_POST['Inomcom'],$_POST['IRegMae'],$_POST['Ifechbaj'],$_POST['InomSolic'],$_POST['Ifechbase'],$_POST['IaniosServ'],$_POST['Imonttotret'],$_POST['IfechRecibido'],$_POST['Inumbenefs'],$_POST['Idoctestamnt'],$_POST['Inomsbenefs'],$_POST['Icurpsbenefs'],$_POST['Iparentsbenefs'],$_POST['Iporcnsbenefs'],$_POST['Iedadesbenefs'],$_POST['Ividabenefs'],$_POST['Ifechtestamnt'],$_POST["Icurpmae"],$_POST["Irfcmae"],$_POST["IObserv"],$_POST["IfolBenefs"],$_POST["ImonstBenefs"],$_SESSION['usuario']);
            echo json_encode($a_addTramFHist, JSON_FORCE_OBJECT);
            break;
        
        case 'agregarFJ':
            $a_addTramFJHist = $tramite -> addtramiteFJ_Hist($_POST['Ianioentr'],$_POST['Inumentr'],$_POST['Iidentr'],$_POST['Icveissemym'],$_POST['Imotret'],$_POST['Iapepat'],$_POST['Iapemat'],$_POST['Inombre'],$_POST['Inomcom'],$_POST['IRegMae'],$_POST['Ifechbaj'],$_POST['InomSolic'],$_POST['Ifechbase'],$_POST['IaniosServ'],$_POST['Imonttotret'],$_POST['IfechRecibido'],$_POST['Inumbenefs'],$_POST['Idoctestamnt'],$_POST['Inomsbenefs'],$_POST['Icurpsbenefs'],$_POST['Iparentsbenefs'],$_POST['Iporcnsbenefs'],$_POST['Iedadesbenefs'],$_POST['Ividabenefs'],$_POST['Icurpmae'],$_POST['Irfcmae'],$_POST['Ifechtestamnt'],$_POST["IObserv"],$_POST["IfolBenefs"],$_POST["ImonstBenefs"],$_SESSION['usuario']);
            echo json_encode($a_addTramFJHist, JSON_FORCE_OBJECT);
            break;

        
        case 'updateJunInha':
            $a_update_JubInha = $tramite->updateJubInha($_POST['Uanioentr'],$_POST['Unumentr'],$_POST['Uidentr'],$_POST['Uidret'],$_POST['Uidentrret'],$_POST['Ucvemae'],$_POST['Ucveissemym'],$_POST['Uestatusmae'],$_POST['Umotret'],$_POST['Uapepat'],$_POST['Uapemat'],$_POST['Unombre'],$_POST['Unomcom'],$_POST['URegMae'],$_POST['UnumDictam'],$_POST['UfechDictam'],$_POST['Ufechbaj'],$_POST['UnomSolic'],$_POST['UNumCel'],$_POST['UnumPart'],$_POST['Ufechbase'],$_POST['UfechInipsgs'],$_POST['UfechFinpsgs'],$_POST['Unumpsgs'],$_POST['Udiaspsgs'],$_POST['UdiasServ'],$_POST['UaniosServ'],$_POST['UmodRet'],$_POST['Umonttotret'],$_POST['UmontretEntr'],$_POST['UmontRetFF'],$_POST['UfechRecibido'],$_POST['UnumOficTarj'],$_POST['UfechOficAut'],$_POST['UimageOficTarj'],$_POST['UdiaHaber'],$_POST['UadedFajam'],$_POST['UadedTS'],$_POST['UadedFondPens'],$_POST['UadedTurismo'],$_POST['UmontAdeds'],$_POST['UmontretSnAdeds'],$_POST['Unumadeds'],$_POST['Ucurpmae'],$_POST['Urfcmae'],$_POST['UtipTram'],$_POST['UfolCheqBenef'],$_SESSION['usuario']);
            echo json_encode($a_update_JubInha, JSON_FORCE_OBJECT);
            break;

        case 'updateFA':
            $a_update_FA = $tramite->updateFA($_POST['Uanioentr'],$_POST['Unumentr'],$_POST['Uidentr'],$_POST['Uidret'],$_POST['Uidentrret'],$_POST['Ucvemae'],$_POST['Ucveissemym'],$_POST['Uestatusmae'],$_POST['Umotret'],$_POST['Uapepat'],$_POST['Uapemat'],$_POST['Unombre'],$_POST['Unomcom'],$_POST['URegMae'],$_POST['Ufechbaj'],$_POST['UnomSolic'],$_POST['UNumCel'],$_POST['UnumPart'],$_POST['Ufechbase'],$_POST['UfechInipsgs'],$_POST['UfechFinpsgs'],$_POST['Unumpsgs'],$_POST['Udiaspsgs'],$_POST['UdiasServ'],$_POST['UaniosServ'],$_POST['UmodRet'],$_POST['Umonttotret'],$_POST['UmontretEntr'],$_POST['UfechRecibido'],$_POST['UnumOficTarj'],$_POST['UfechOficAut'],$_POST['UimageOficTarj'],$_POST['Unumbenefs'],$_POST['UadedFajam'],$_POST['UadedTS'],$_POST['UadedFondPens'],$_POST['UadedTurismo'],$_POST['UmontAdeds'],$_POST['UmontretSnAdeds'],$_POST['Unumadeds'],$_POST['Unombenefs'],$_POST['Ucurpbenefs'],$_POST['Uparentbenefs'],$_POST['Uporcbenefs'],$_POST['Uedadbenefs'],$_POST['Uvidabenefs'],$_POST['Udoctestamnt'],$_POST['Ufechdoctestmnt'],$_POST['Ucurpmae'],$_POST['Urfcmae'],$_POST['UtipTram'],$_POST['UfolCheqBenef'],$_SESSION['usuario']);
            echo json_encode($a_update_FA, JSON_FORCE_OBJECT);
            break;
        
        case 'updateFJ':
            $a_update_FJ = $tramite->updateFJ($_POST['Uanioentr'],$_POST['Unumentr'],$_POST['Uidentr'],$_POST['Uidret'],$_POST['Uidentrret'],$_POST['Ucveissemym'],$_POST['Uestatusmae'],$_POST['Umotret'],$_POST['Uapepat'],$_POST['Uapemat'],$_POST['Unombre'],$_POST['Unomcom'],$_POST['URegMae'],$_POST['Ufechbaj'],$_POST['UnomSolic'],$_POST['UNumCel'],$_POST['UnumPart'],$_POST['Ufechbase'],$_POST['UdiasServ'],$_POST['UaniosServ'],$_POST['UmodRet'],$_POST['Umonttotret'],$_POST['UmontretEntr'],$_POST['UfechRecibido'],$_POST['UnumOficTarj'],$_POST['UfechOficAut'],$_POST['UimageOficTarj'],$_POST['Unumbenefs'],$_POST['UadedFajam'],$_POST['UadedTS'],$_POST['UadedFondPens'],$_POST['UadedTurismo'],$_POST['UmontAdeds'],$_POST['UmontretSnAdeds'],$_POST['Unumadeds'],$_POST['Unombenefs'],$_POST['Ucurpbenefs'],$_POST['Uparentbenefs'],$_POST['Uporcbenefs'],$_POST['Uedadbenefs'],$_POST['Uvidabenefs'],$_POST['Udoctestamnt'],$_POST['Ufechdoctestmnt'],$_POST['Ucurpmae'],$_POST['Urfcmae'],$_POST['Urfcmae'],$_POST['UtipTram'],$_SESSION['usuario']);
            echo json_encode($a_update_FJ, JSON_FORCE_OBJECT);
            break;

        default:            
            break;
    }

?>