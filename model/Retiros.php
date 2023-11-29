<?php
    session_start();

    require_once("/var/www/html/cap1215/model/formularioTram.php");

    class Retiros extends formularioTram{

        public function __construct()
        {
            require_once("/var/www/html/cap1215/config/dbfonretyf.php");
            $pdo = new dbfonretyf();
            $this->db=$pdo->conexfonretyf();
        }

        public function get_retiros($identrega){
            $results_rets=array();

            $consulta= "SELECT tab1.identrega,tab1.numentrega,tab1.anioentrega,tab1.identret,tab1.cvemae,tab1.motvret,tab2.nomcommae,tab1.montrettot,tab1.estattramite,tab3.folcheque FROM public.tramites_fonretyf_hist as tab1 LEFT JOIN public.beneficiarios_cheques_hist as tab3 on tab1.cvemae = tab3.cvemae LEFT JOIN(SELECT tab1.cvemae,tab2.nomcommae";
            $consulta = $consulta . " FROM public.tramites_fonretyf_hist as tab1, public.maestros_smsem as tab2 WHERE tab1.cvemae = tab2.csp UNION SELECT tab1.cvemae,tab2.nomcommae FROM public.tramites_fonretyf_hist as tab1, public.mutualidad as tab2 WHERE tab1.cvemae = tab2.cveissemym) as tab2 on tab1.cvemae= tab2.cvemae WHERE identrega='" . $identrega . "' and (motvret='FRI' or motvret='FRJ') ORDER BY identret DESC;";
            $statement = $this->db->prepare($consulta);
            $statement->execute();
            $resultsJub = $statement->fetchAll(PDO::FETCH_ASSOC);
            $results_rets[] = $resultsJub;

            $consultaF= "SELECT tab1.identrega,tab1.numentrega,tab1.anioentrega,tab1.identret,tab1.cvemae,tab1.motvret,tab2.nomcommae,tab1.montrettot,tab1.estattramite FROM public.tramites_fonretyf_hist as tab1 LEFT JOIN(SELECT tab1.cvemae,tab2.nomcommae FROM public.tramites_fonretyf_hist as tab1, public.maestros_smsem as tab2 WHERE tab1.cvemae = tab2.csp UNION";
            $consultaF = $consultaF . " SELECT tab1.cvemae,tab2.nomcommae FROM public.tramites_fonretyf_hist as tab1, public.mutualidad as tab2 WHERE tab1.cvemae = tab2.cveissemym) as tab2 on tab1.cvemae= tab2.cvemae WHERE identrega= '".$identrega."' and (motvret='FRF' or motvret='FMJ' or motvret='F') ORDER BY identret DESC;";
            $statementF = $this->db->prepare($consultaF);
            $statementF->execute();
            $resultsFall = $statementF->fetchAll(PDO::FETCH_ASSOC);
            $results_rets[] = $resultsFall;

            return $results_rets;
        }

        public function get_EntRet($identrega){
            $statementEstEnt = $this->db->prepare('SELECT estatentrega FROM public.entregas_fonretyf WHERE identrega= ?');
            $statementEstEnt->bindValue(1,$identrega);
            $statementEstEnt->execute();
            $results = $statementEstEnt->fetchAll(PDO::FETCH_ASSOC);
            $estatusE = $results[0]['estatentrega'];
            return $estatusE;
        }

        public function deleteTram($identreret,$clavemae,$cveusu){
            require_once("/var/www/html/cap1215/model/Entregas.php");
            $entrega = new Entrega();

            $get_entrega = $entrega -> get_entrega_id(substr($identreret,0,6));
            $a_resultDeleteTram = array();

            $fecha = "";
            $fecha = date("Y-m-d H:i:s");

            require_once("/var/www/html/cap1215/model/Tramites.php");
            $retiros = new Tramite();
            $tramite = $retiros->get_retiro_Id($clavemae);

            if ($tramite[0]['motvret'] == "FRJ" || $tramite[0]['motvret'] == "FRI") {
                $modoretiro = $tramite[0]['modretiro'];
                switch ($modoretiro) {
                    case 'C':
					    $eliminaCheque = $this->deleteCheque($identreret);
                        $a_resultDeleteTram["eliminaCheque"] = $eliminaCheque;
						
                        $actualizaMaestro = $this->actualizaMaeAct($clavemae,$cveusu,$fecha);
                        $a_resultDeleteTram["actualizaMaestro"] = $actualizaMaestro;
						
                        $eliminaTramite = $this->eliminaTramite($identreret);
                        $a_resultDeleteTram["eliminaTramite"] = $eliminaTramite;
						
                        if ($a_resultDeleteTram["eliminaCheque"] == "Eliminado" && $a_resultDeleteTram["actualizaMaestro"] == "Actualizado" && $a_resultDeleteTram["eliminaTramite"] == "Eliminado" ) {
                            if ($tramite[0]['motvret']=="FRI") {
								try{
									$statementActEntr = "UPDATE public.entregas_fonretyf SET numtramites=". ($get_entrega[0][12] - 1) .", numtraminha=". $get_entrega[0][13] - 1 .", monttotentr=". str_replace(",","",str_replace("$","",$get_entrega[0][29])) - str_replace(",","",str_replace("$","",$tramite[0]['montrettot'])) ."  WHERE identrega='".substr($identreret,0,6)."'";
									$statementActEntr = $this->db->prepare($statementActEntr);
									$statementActEntr->execute();
									$resultsActEntr = $statementActEntr->fetchAll(PDO::FETCH_ASSOC);
								} catch (\Throwable $th){
									$a_resultDeleteTram["updateEntrega"] = "Fallo";
									echo($th);
								}
                                
                            } elseif ($tramite[0]['motvret']=="FRJ") {
                                try{
									$statementActEntr = "UPDATE public.entregas_fonretyf SET numtramites=". ($get_entrega[0][12] - 1) .", numtramjub=". ($get_entrega[0][14] - 1) .", monttotentr=". str_replace(",","",str_replace("$","",$get_entrega[0][29])) - str_replace(",","",str_replace("$","",$tramite[0]['montrettot'])) ."  WHERE identrega='".substr($identreret,0,6)."'";                            
									$statementActEntr = $this->db->prepare($statementActEntr);
									$statementActEntr->execute();
									$resultsActEntr = $statementActEntr->fetchAll(PDO::FETCH_ASSOC);
								}catch(\Throwable $th){
									$a_resultDeleteTram["updateEntrega"] = "Fallo";
									echo($th);
								}
                            }
                        }                       
						return $a_resultDeleteTram;
                        break;

                    default:
                        break;
                }

            } else {
                if ($tramite[0]['motvret'] == "FRF" ) {
                    $eliminaBenefsMae = $this->eliminaBenefsMae($clavemae);
                    $a_resultDeleteTram["eliminaBenefs"] = $eliminaBenefsMae;

                    $eliminaCheque = $this->deleteCheque($identreret);
                    $a_resultDeleteTram["eliminaCheque"] = $eliminaCheque;

                    $actualizaMaestro = $this->actualizaMaeAct($clavemae,$cveusu,$fecha);
                    $a_resultDeleteTram["actualizaMaestro"] = $actualizaMaestro;

                    $eliminaTramite = $this->eliminaTramite($identreret);
                    $a_resultDeleteTram["eliminaTramite"] = $eliminaTramite;

                    if ($a_resultDeleteTram["eliminaBenefs"] == "Eliminado" && $a_resultDeleteTram["eliminaCheque"] == "Eliminado" && $a_resultDeleteTram["actualizaMaestro"] == "Actualizado" && $a_resultDeleteTram["eliminaTramite"] == "Eliminado" ) {
                        $statementActEntr = "UPDATE public.entregas_fonretyf SET numtramites=". $get_entrega[0][12] - 1 .", numtramfall=". $get_entrega[0][15] - 1 .", numtramfallact=".$get_entrega[0][16] - 1 .", monttotentr=". str_replace(",","",str_replace("$","",$get_entrega[0][29])) - str_replace(",","",str_replace("$","",$tramite[0]['montrettot'])) ."  WHERE identrega='".substr($identreret,0,6)."'";
                        $statementActEntr = $this->db->prepare($statementActEntr);
                        $statementActEntr->execute();
                        $resultsActEntr = $statementActEntr->fetchAll(PDO::FETCH_ASSOC);
                    }
                    return $a_resultDeleteTram;

                } elseif ($tramite[0]['motvret'] == "FMJ") {
                    $eliminaBenefsMae = $this->eliminaBenefsMae($clavemae);
                    $a_resultDeleteTram["eliminaBenefs"] = $eliminaBenefsMae;

                    $eliminaCheque = $this->deleteCheque($identreret);
                    $a_resultDeleteTram["eliminaCheque"] = $eliminaCheque;

                    $actualizaMaestro = $this->actualizaMaeActJubMut($clavemae,$cveusu,$fecha);
                    $a_resultDeleteTram["actualizaMaestro"] = $actualizaMaestro;

                    $eliminaTramite = $this->eliminaTramite($identreret);
                    $a_resultDeleteTram["eliminaTramite"] = $eliminaTramite;

                    if ($a_resultDeleteTram["eliminaBenefs"] == "Eliminado" && $a_resultDeleteTram["eliminaCheque"] == "Eliminado" && $a_resultDeleteTram["actualizaMaestro"] == "Actualizado" && $a_resultDeleteTram["eliminaTramite"] == "Eliminado" ) {
                        $statementActEntr = "UPDATE public.entregas_fonretyf SET numtramites=". $get_entrega[0][12] - 1 .", numtramfall=". $get_entrega[0][15] - 1 .", numtramfalljubm=".$get_entrega[0][17] - 1 .", monttotentr=". str_replace(",","",str_replace("$","",$get_entrega[0][29])) - str_replace(",","",str_replace("$","",$tramite[0]['montrettot'])) ."  WHERE identrega='".substr($identreret,0,6)."'";
                        $statementActEntr = $this->db->prepare($statementActEntr);
                        $statementActEntr->execute();
                        $resultsActEntr = $statementActEntr->fetchAll(PDO::FETCH_ASSOC);
                    }
                    return $a_resultDeleteTram;
                }
            }
        }

        public function deleteCheque($identreret){
            try {
                $statementDelete = "DELETE FROM public.beneficiarios_cheques_hist WHERE identret='".$identreret."';";
                $statementDelete = $this->db->prepare($statementDelete);
                $statementDelete->execute();
                $results = $statementDelete->fetchAll(PDO::FETCH_ASSOC);
                $resultDeleteCheq = "Eliminado";
                return $resultDeleteCheq;
            } catch (\Throwable $th) {
                $resultDeleteCheq = "Fallo";
                return $resultDeleteCheq;
            }
        }

        public function actualizaMaeAct($clavemae,$cveusu,$fecha){
            try {
                $statementUpdate = "UPDATE public.maestros_smsem";
                $statementUpdate = $statementUpdate . " SET cveissemym='', regescmae=0 , numcelmae='', numfijmae='', fcbasemae='1900-01-01', aservactmae=0, fbajamae='1900-01-01', numpsgs=0, diaspsgs=0, estatlabmae='P', cveusu='".$cveusu."', fechmodif='".$fecha."', diaservactmae=0, afiprogfondfalle=0, fechsinipsgs='{}', fechsfinpsgs='{}'";
                $statementUpdate = $statementUpdate . " WHERE csp='" . $clavemae."';";
                $statementUpdate = $this->db->prepare($statementUpdate);
                $statementUpdate->execute();
                $results = $statementUpdate->fetchAll(PDO::FETCH_ASSOC);
                $resultUpdMaestro = "Actualizado";
                return $resultUpdMaestro;
            } catch (\Throwable $th) {
                $resultUpdMaestro = "Fallo";
                return $resultUpdMaestro;
            }
        }

        public function actualizaMaeActJubMut($cvamae,$cveusu,$fecha){
            try {
                $statementUpdate = "UPDATE public.mutualidad";
                $statementUpdate = $statementUpdate . " SET curpmae='' ,rfcmae='', regmae=0, numcelmae='', numfijmae='', fcfallecmae='1900-01-01', estatmutual='A', aniosjub=0, cveusu='".$cveusu."', fechmodif='".$fecha."', estatusmae='J'";
                $statementUpdate = $statementUpdate . " WHERE cveissemym='" . $cvamae."';";

                $statementUpdate = $this->db->prepare($statementUpdate);
                $statementUpdate->execute();
                $results = $statementUpdate->fetchAll(PDO::FETCH_ASSOC);
                $resultUpdMaestro = "Actualizado";
                return $resultUpdMaestro;
            } catch (\Throwable $th) {
                $resultUpdMaestro = "Fallo";
                return $resultUpdMaestro;
            }
        }

        public function eliminaTramite($identret){
            try {
                $statementDelete = "DELETE FROM public.tramites_fonretyf_hist WHERE identret='".$identret."';";
                $statementDelete = $this->db->prepare($statementDelete);
                $statementDelete->execute();
                $results = $statementDelete->fetchAll(PDO::FETCH_ASSOC);
                $resultDeleteTram = "Eliminado";
                return $resultDeleteTram;
            } catch (\Throwable $th) {
                $resultDeleteTram = "Fallo";
                return $resultDeleteTram;
            }
        }

        public function eliminaMaeJubilado($cveissemym){
            try {
                $statementDelete = "DELETE FROM public.jubilados_smsem WHERE cveissemym='".$cveissemym."';";
                $statementDelete = $this->db->prepare($statementDelete);
                $statementDelete->execute();
                $results = $statementDelete->fetchAll(PDO::FETCH_ASSOC);
                $resultDeleteTram = "Eliminado";
                return $resultDeleteTram;
            } catch (\Throwable $th) {
                $resultDeleteTram = "Fallo";
                return $resultDeleteTram;
            }
        }

        public function eliminaBenefsMae($clavemae){
            try {
                $statementDelete = "DELETE FROM public.beneficiarios_maestros WHERE cvemae='".$clavemae."';";
                $statementDelete = $this->db->prepare($statementDelete);
                $statementDelete->execute();
                $results = $statementDelete->fetchAll(PDO::FETCH_ASSOC);
                $resultDeleteCheq = "Eliminado";
                return $resultDeleteCheq;
            } catch (\Throwable $th) {
                $resultDeleteCheq = "Fallo";
                return $resultDeleteCheq;
            }
        }

        public function get_infoDTJI($identret,$modretiro,$cvemae,$motivoRet){
            if ($motivoRet == "FRJ" || $motivoRet == "FRI") {
                $statementDT = "SELECT tab1.*,tab2.nomcommae,tab2.curpmae,tab2.rfcmae,tab2.regescmae,tab2.fcbasemae,tab2.aservactmae,tab2.fbajamae,tab2.fechfallecmae,tab2.estatlabmae,tab3.identret,tab3.idbenef,tab3.idbenefcheque,tab3.nombenef,";
                $statementDT = $statementDT . "tab3.montbenef,tab3.folcheque,tab3.fechcheque,tab3.fechentrega,tab3.estatcheque,tab3.porcretbenef,tab3.statedad, tab2.cveissemym, tab2.apepatmae, tab2.apematmae, tab2.nommae, tab2.fechsinipsgs, tab2.fechsfinpsgs, tab2.diaservactmae";
                $statementDT = $statementDT . " FROM public.tramites_fonretyf_hist as tab1 LEFT JOIN public.maestros_smsem as tab2 ON tab1.cvemae=tab2.csp LEFT JOIN public.beneficiarios_cheques_hist as tab3";
                $statementDT = $statementDT . " ON tab1.cvemae=tab3.cvemae where tab1.cvemae='".$cvemae."' and tab1.identret='".$identret."';";
                $statementDT = $this->db->prepare($statementDT);
                $statementDT->execute();
                $results = $statementDT->fetchAll(PDO::FETCH_ASSOC);
            }elseif ($motivoRet == "FRF") {
                $statementDT = "SELECT tab1.*,tab2.nomcommae,tab2.curpmae,tab2.rfcmae,tab2.regescmae,tab2.fcbasemae,tab2.aservactmae,tab2.fbajamae,tab2.numpsgs,tab2.diaspsgs,tab2.fechfallecmae,tab2.estatlabmae,tab2.cveissemym, tab2.apepatmae, tab2.apematmae, tab2.nommae, tab2.fechsinipsgs, tab2.fechsfinpsgs, tab2.diaservactmae";
                $statementDT = $statementDT . " FROM public.tramites_fonretyf_hist as tab1 LEFT JOIN public.maestros_smsem as tab2 ON tab1.cvemae=tab2.csp";
                $statementDT = $statementDT . " WHERE tab1.cvemae='".$cvemae."' and tab1.identret='".$identret."';";
                $statementDT = $this->db->prepare($statementDT);
                $statementDT->execute();
                $results = $statementDT->fetchAll(PDO::FETCH_ASSOC);
            }
            return $results;
        }

        public function get_infoDTFJ($identret,$modretiro,$cvemae,$motivoRet){
            $statementDT = "SELECT tab1.*,tab2.cveissemym,tab2.apepatmae,tab2.apematmae,tab2.nommae,tab2.nomcommae,tab2.curpmae,tab2.rfcmae,tab2.regmae,tab2.fechbajamae,tab2.fcfallecmae,tab2.aniosjub,";
            $statementDT = $statementDT . " tab2.estatusmae, tab2.diasjub FROM public._hist as tab1 LEFT JOIN public.mutualidad as tab2 ON tab1.cvemae=tab2.cveissemym";
            $statementDT = $statementDT . " WHERE tab1.cvemae='".$cvemae."' and tab1.identret='".$identret."';";
            $statementDT = $this->db->prepare($statementDT);
            $statementDT->execute();
            $results = $statementDT->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }

        public function get_infoDTFA($identret,$cvemae){
            $statementDTFA = "SELECT tab1.*,tab2.nomcommae,tab2.curpmae,tab2.rfcmae,tab2.regescmae,tab2.fcbasemae,tab2.aservactmae,tab2.fbajamae,tab2.numpsgs,tab2.diaspsgs,tab2.fechfallecmae,tab2.estatlabmae,tab3.identret,tab3.idbenef,tab3.idbenefcheque,tab3.nombenef,";
            $statementDTFA = $statementDTFA . "tab3.montbenef,tab3.folcheque,tab3.fechcheque,tab3.fechentrega,tab3.estatcheque,tab3.porcretbenef,tab3.statedad, tab2.cveissemym, tab2.apepatmae, tab2.apematmae, tab2.nommae, tab2.fechsinipsgs, tab2.fechsfinpsgs, tab2.diaservactmae";
            $statementDTFA = $statementDTFA . " FROM public.tramites_fonretyf_hist as tab1 LEFT JOIN public.maestros_smsem as tab2 ON tab1.cvemae=tab2.csp LEFT JOIN public.beneficiarios_cheques_hist as tab3";
            $statementDTFA = $statementDTFA . " ON tab1.cvemae=tab3.cvemae where tab1.cvemae='".$cvemae."' and tab1.identret='".$identret."';";
            $statementDTFA = $this->db->prepare($statementDTFA);
            $statementDTFA->execute();
            $results = $statementDTFA->fetchAll(PDO::FETCH_ASSOC);

            return $results;
        }

        public function get_benefs($cvemae){
            $statementDTBenefs = "SELECT tab1.idbenef,tab1.idbenefcheque,tab1.cvemae,tab1.nombenef,tab1.curpbenef,tab1.parentbenef,tab1.porcretbenef,tab1.edadbenef,tab1.vidabenef,tab2.folcheque,tab2.estatcheque,tab2.fechcheque";
            $statementDTBenefs = $statementDTBenefs . " FROM public.beneficiarios_maestros as tab1 LEFT JOIN public.beneficiarios_cheques_hist as tab2 ";
            $statementDTBenefs = $statementDTBenefs . " ON tab1.idbenefcheque=tab2.idbenefcheque WHERE tab1.cvemae='".$cvemae."'  ORDER BY idbenef ASC;";
            $statementDTBenefs = $this->db->prepare($statementDTBenefs);
            $statementDTBenefs->execute();
            $results = $statementDTBenefs->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }

        public function get_datsBenefs($identret,$cvemae){
            $statementDTBenefs = "SELECT tab1.*, tab2.* FROM public.beneficiarios_cheques_hist as tab1 LEFT JOIN public.beneficiarios_maestros as tab2 ON tab1.idbenefcheque = tab2.idbenefcheque WHERE tab1.cvemae = '".$cvemae."' and tab1.identret = '".$identret."'  ORDER BY tab1.idbenef ASC;";
            $statementDTBenefs = $this->db->prepare($statementDTBenefs);
            $statementDTBenefs->execute();
            $results = $statementDTBenefs->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }

        public function getRetCheq($folcheque){
             try {
                $consultaCheq = "SELECT identret,cvemae,movimtscheque FROM public.beneficiarios_cheques_hist WHERE folcheque='".$folcheque."';";
                $statement = $this->db->prepare($consultaCheq);
                $statement->execute();
                $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            } catch (\Throwable $th) {
                echo($th);
            }
            return $result;
        }

    }

?>
