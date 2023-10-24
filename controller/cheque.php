<?php

    session_start();

	require_once("/var/www/html/cap1215/model/cantidadLetras.php");
	$cantLetra = new cantidadLetras();

    require_once "/var/www/html/cap1215/model/Cheque.php";
    $cheque = new Cheque();

    switch ($_GET["opcion"]) {
        case 'buscaCheque':
            $resultBusqCheq = $cheque->buscaCheque($_POST["folcheque"]);
            echo json_encode($resultBusqCheq, JSON_FORCE_OBJECT);
            break;

        case 'buscaCheqC':
            $resultBusq = $cheque->buscachequeC($_POST["folio"]);
            echo json_encode($resultBusq, JSON_FORCE_OBJECT);
            break;

        case 'reponerCheque':
            $resultOperac = $cheque->reponerCheque($_POST["folioAnt"],$_POST["folioNuevo"],$_POST["fechRepos"],$_POST["observRepos"],$_POST["nomBenef"],$_POST["montBenef"],$_POST["montBenefLet"],$_SESSION["usuario"]);
            echo json_encode($resultOperac, JSON_FORCE_OBJECT);
            break;

        case 'cancelCheque':
            $a_cancel_cheque = $cheque->cancelaCheque($_POST["numcheque"],$_POST["motvcanc"],$_POST["observ"],$_SESSION['usuario']);
            echo json_encode($a_cancel_cheque, JSON_FORCE_OBJECT);
            break;
		
		case 'cantidadLet':
			$montBenefLet = $cantLetra->cantidadLetras($_POST["montoRepos"]);
			echo($montBenefLet);
			break;

        default:
            # code...
            break;
    }

?>
