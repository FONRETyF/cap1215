<?php

    session_start();

    class Maestro{
        private $db;
        private $entregas;
        
        public function __construct(){
            require_once("/var/www/html/cap1215/config/dbfonretyf.php");
            $pdo = new dbfonretyf();
            $this->db=$pdo->conexfonretyf();
            $this->entregas = array();
        }
        
        public function get_maestro($clavemae){
            $statement = $this->db->prepare('SELECT csp,cveissemym,apepatmae,apematmae,nommae,nomcommae,curpmae,rfcmae,estatlabmae FROM public.maestros_smsem WHERE csp=?');
            $statement->bindValue(1,$clavemae);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }
        
        public function get_maestroJub($claveIssemym){
            $statement = $this->db->prepare('SELECT cveissemym,programfallec,apepatjub,apematjub,nomjub,nomcomjub FROM public.jubilados_smsem WHERE cveissemym=?');
            $statement->bindValue(1,$claveIssemym);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }

        public function get_maestroMutualidad($claveisemym){
            $statement = $this->db->prepare('SELECT cveissemym,apepatmae,apematmae,nommae,nomcommae,curpmae,rfcmae,fechbajamae,estatmutual FROM public.mutualidad WHERE cveissemym=?');
            $statement->bindValue(1,$claveisemym);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }

        public function get_maestroFondoFallec($claveisemym){
            $consultaMFF = "SELECT cveissemym,fechafifondfalle,estatfondfall, (SELECT apepatmae FROM public.maestros_smsem WHERE cveissemym = '".$claveisemym."') as apepatmae,(SELECT apematmae FROM public.maestros_smsem WHERE cveissemym = '".$claveisemym."') as apematmae,";
            $consultaMFF = $consultaMFF . "(SELECT nommae FROM public.maestros_smsem WHERE cveissemym = '".$claveisemym."') as nommae,(SELECT nomcommae FROM public.maestros_smsem WHERE cveissemym = '".$claveisemym."') as nomcommae,(SELECT curpmae FROM public.maestros_smsem WHERE cveissemym = '".$claveisemym."') as curpmae,";
            $consultaMFF = $consultaMFF . "(SELECT rfcmae FROM public.maestros_smsem WHERE cveissemym = '".$claveisemym."') as rfcmae FROM public.fondo_fallecimiento WHERE cveissemym = '".$claveisemym."';";
            $statement = $this->db->prepare($consultaMFF);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }

        public function update_nomMae($apepatmae,$apematmae,$nommae,$nomcommae,$cvemae,$cveusu){
            $fecha = date("Y-m-d");
            $nomcommae = $apepatmae . " " . $apematmae . " " . $nommae;
            $datsInsert=array($apepatmae, $apematmae, $nommae, $nomcommae, $cveusu, $fecha,$cvemae);
			
			$resultUPNomMae = array();
			
			if(strlen($cvemae) === 9){
				try{
					$statement = $this->db->prepare("UPDATE public.maestros_smsem SET apepatmae=?, apematmae=?, nommae=?, nomcommae=?, cveusu=?, fechmodif= ?  WHERE csp=?");
					$statement->execute($datsInsert);
					$resultUPNomMae["updateMae"] = 'actualizado';
				} catch (\Throwable $th) {
					echo($th);
					
					$resultUPNomMae["updateMae"] = 'fallo';
				}
				return $resultUPNomMae;
			}else{
				$maejub = $this->get_maestroJub($cvemae);
				if ($maejub[0]['programfallec'] == 'M'){
					try{
						$statement = $this->db->prepare("UPDATE public.jubilados_smsem SET apepatjub=?, apematjub=?, nomjub=?, nomcomjub=?, cveusumodif=?, fechmodif= ?  WHERE cveissemym=?");
						$statement->execute($datsInsert);
						$statement = $this->db->prepare("UPDATE public.mutualidad SET apepatmae=?, apematmae=?, nommae=?, nomcommae=?, cveusu=?, fechmodif= ?  WHERE cveissemym=?");
						$statement->execute($datsInsert);
						
						$resultUPNomMae["updateMae"] = 'actualizado';
					} catch (\Throwable $th) {
						echo($th);
						$resultUPNomMae["updateMae"] = 'fallo';
					}
					return $resultUPNomMae;
				}else{
					
				}
			}
        }
        
        public function buscaTrsmitesHist($clavemae){
			try{
				$statement = $this->db->prepare('SELECT identrega,identret,cvemae,motvret,fechentrega FROM public.tramites_fonretyf WHERE cvemae=?');
				$statement->bindValue(1,$clavemae);
				$statement->execute();
				$results = $statement->fetchAll(PDO::FETCH_ASSOC);
				if(count($results) == 0){
					$statement = $this->db->prepare('SELECT identrega,identret,cvemae,motvret,fechentrega FROM public.tramites_fonretyf_hist WHERE cvemae=?');
					$statement->bindValue(1,$clavemae);
					$statement->execute();
					$resultsH = $statement->fetchAll(PDO::FETCH_ASSOC);
					return $resultsH;
				}else{
					return $results;
				}
			}catch (\Throwable $th){
				echo($th);
			}
        }

        public function busca_EdoCta($criterioBusq,$valorCriterio){
            $a_EdoCta = array();
            $a_results_EdoCta = array();

            if ($criterioBusq === "cveissemym") {
                try {
                    $statement = $this->db->prepare('SELECT cveissemym,programfallec FROM public.jubilados_smsem WHERE cveissemym=?');
                    $statement->bindValue(1,$valorCriterio);
                    $statement->execute();
                    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                } catch (\Throwable $th) {
                    echo($th);
                }
               
            } elseif ($criterioBusq === "nomcomjub") {
                try {
                    $consulta ="SELECT cveissemym,programfallec FROM public.jubilados_smsem WHERE nomcomjub LIKE '%".$valorCriterio."%';";
                    $statement = $this->db->prepare($consulta);
                    $statement->execute();
                    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                } catch (\Throwable $th) {
                    echo($th);
                }
            }   
          
            foreach ($results as $row) {
                if ($row["programfallec"] === "M") {
                    try {
                        $consulta ="SELECT tabMut.cveissemym,tabMut.nomcommae,tabMut.estatmutual,tabMut.fechbajamae,tabMut.fechafimutu,tabEdoCta.numaport,tabEdoCta.montaport,tabEdoCta.anioiniaport,tabEdoCta.anioultaport";
                        $consulta = $consulta . " FROM public.mutualidad as tabMut LEFT JOIN public.edoscta_mut as tabEdoCta ON tabMut.cveissemym = tabEdoCta.cveissemym WHERE tabMut.cveissemym = '".$row["cveissemym"]."';";
                        $statement = $this->db->prepare($consulta);
                        $statement->execute();
                        $resultsEdoCta = $statement->fetchAll(PDO::FETCH_ASSOC);
                        $a_results_EdoCta["EdoCta"] = $resultsEdoCta;
                        $a_results_EdoCta["programa"] = "M";
                        array_push($a_EdoCta,$a_results_EdoCta);
                    } catch (\Throwable $th) {
                        echo($th);
                    }
                } elseif ($row["programfallec"] === "FF") {
                    # code...
                }               
            }
            return $a_EdoCta;
        }

        public function insertMae($csp,$cveissemym,$apepat,$apemat,$nombre,$nomcom,$curp,$rfc,$region,$cveusu){
            $resultInsertMae = array();
            try {
                $fecha = date("Y-m-d");
                $consulta ="INSERT INTO public.maestros_smsem(csp, cveissemym, apepatmae, apematmae, nommae, nomcommae, curpmae, rfcmae, dommae, collocmae, mundommae, edodommae, zonescmae, regescmae, cctmae, nivescmae, numcelmae, numfijmae, numotromae, fcbasemae, diaservactmae, aservactmae, fbajamae, numpsgs, diaspsgs, fechsinipsgs, fechsfinpsgs, fechfallecmae, estatlabmae, afiprogfondfalle, cveusu, fechmodif)";
                $consulta = $consulta . " VALUES ('".$csp."','".$cveissemym."','".$apepat."','".$apemat."','".$nombre."','".$nomcom."','".$curp."','".$rfc."','', '', '', '', '',".$region.",'', '', '', '', '', '1900-01-01', 0, 0, '1900-01-01', 0, 0, '{}', '{}', '1900-01-01', 'A', 0, '".$cveusu."', '".$fecha."');";
                $statement = $this->db->prepare($consulta);
                $statement->execute();
                $resultsEdoCta = $statement->fetchAll(PDO::FETCH_ASSOC);
                $resultInsertMae["insertMae"] = "Agregado";
            } catch (\Throwable $th) {
                $resultInsertMae["insertMae"] = "Fallo";
                echo($th);
            }
            return $resultInsertMae;
        }

        public function insertMaeJub($cveissemym,$apepat,$apemat,$nombre,$nomcom,$cveusu){
            $fecha = date("Y-m-d");
            $resultInsertMae = array();
            try {
                $fecha = date("Y-m-d");
                $consulta ="INSERT INTO public.jubilados_smsem(cveissemym, apepatjub, apematjub, nomjub, nomcomjub, programfallec, cveusureg, fechreg, histmodif, cveusumodif, fechmodif)";
                $consulta = $consulta . " VALUES ('".$cveissemym."','".$apepat."','".$apemat."','".$nombre."','".$nomcom."','M','".$cveusu."', '".$fecha."', '', '', '1900-01-01');";
                $statement = $this->db->prepare($consulta);
                $statement->execute();
                $resultsEdoCta = $statement->fetchAll(PDO::FETCH_ASSOC);
                $resultInsertMae["insertMaeJub"] = "Agregado";
            } catch (\Throwable $th) {
                $resultInsertMae["insertMaeJub"] = "Fallo";
                echo($th);
            }
            return $resultInsertMae;
        }

        public function insertMaeJubMut($cveissemym,$apepat,$apemat,$nombre,$nomcom,$curpmae,$rfcmae,$fechbase,$fechbajfall,$aniosserv,$region,$cveusu){
            $fecha = date("Y-m-d");
            $resultInsertMae = array();
            try {
                $fecha = date("Y-m-d");
                
                $getmaxmaemut = $this->db->prepare("SELECT max(idcapmutu) from public.mutualidad where anioemision=1900 and numemision=1");
                $getmaxmaemut->execute();
                $resultsMax = $getmaxmaemut->fetchAll();
                if (is_null($resultsMax)) {
                    $idmaeMut = 1;
                }else{
                    $idmaeMut = $resultsMax[0]['max'] + 1;
                }

                $consulta ="INSERT INTO public.mutualidad(anioemision, numemision, idcapmutu, cveissemym, apepatmae, apematmae, nommae, nomcommae, curpmae, rfcmae, dommae, collocmae, mundommae, edodommae, regmae, numcelmae, numfijmae, numotromae, fechbajamae, fcfallecmae, estatmutual, fechsolicmutu, fechafimutu, aniosjub, diasjub, estatusmae, cveusu, fechmodif)";
                $consulta = $consulta . " VALUES (1900,1,$idmaeMut,'".$cveissemym."','".$$apepat."','".$apemat."','".$nombre."','".$nomcom."','".$curpmae."','".$rfcmae."','','','','',$region,'','','','".$fechbase."','".$fechbajfall."','F','".$fechbase."','".$fechbase."',$aniosserv,0,'F','".$cveusu."', '".$fecha."');";
                $statement = $this->db->prepare($consulta);
                $statement->execute();
                $resultsEdoCta = $statement->fetchAll(PDO::FETCH_ASSOC);
                $resultInsertMae["insertMaeJubMut"] = "Agregado";
            } catch (\Throwable $th) {
                $resultInsertMae["insertMaeJubMut"] = "Fallo";
                echo($th);
            }
            return $resultInsertMae;
        }

    }
?>