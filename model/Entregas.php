<?php
    session_start();

    class Entrega{
        private $db;
        private $entregas;
        
        public function __construct()
        {
            require_once("../config/dbfonretyf.php");
            $pdo = new dbfonretyf();
            $this->db=$pdo->conexfonretyf();
            $this->entregas = array();
        }
        
        public function get_entregas()
        {
            try {
                $statement = $this->db->prepare("SELECT identrega,numentrega,anioentrega,descentrega,fechentrega,estatentrega,numtramites,monttotentr FROM public.entregas_fonretyf WHERE anioentrega = '2012' ORDER BY identrega desc");
                $statement->execute();
                $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                return $results;
            } catch (\Throwable $th) {
                echo $th;
            }
            
        }
        
        public function get_entrega_id($identrega){
            try {
                $statement = $this->db->prepare("SELECT * FROM public.entregas_fonretyf WHERE identrega= ?");
                $statement->bindValue(1,$identrega);
                $statement->execute();
                return $result = $statement->fetchAll();
            } catch (\Throwable $th) {
                echo $th;
            }
        }
        
        public function delete_entrega($identrega){
            try {
                $statement = $this->db->prepare('DELETE FROM public.entregas_fonretyf WHERE identrega = ?');
                $statement->bindValue(1,$identrega);
                $statement->execute();
                $result = $statement->fetchAll();
                return $result;
            } catch (\Throwable $th) {
                echo $th;
            }
            
        }
        
        public function insert_entrega($identrega,$anioentrega,$numentrega,$descentrega,$cveusu,$fechentrega,$observaciones){
            $resulInsert = array();
            $fecha = date("Y-m-d");
            try {
                $consultaInsertEntr = "INSERT INTO public.entregas_fonretyf(identrega, anioentrega, numentrega, descentrega, estatentrega, fechentrega, folioinicial, foliofinal, folios, numcheques, numcarpetas, numtramites, numtraminha, numtramjub, numtramfall, numtramfallact, numtramfalljubm, numtramfalljubff, fechapertura, usuapert, fechcierre, usucierre, cheqsentre, cheqscancel, traspaso, soliccheqs, impcheqs,";
                $consultaInsertEntr = $consultaInsertEntr . " statarchivo, monttotentr, totadeds, adedsfajam, montadedsf, adedsts, montadedsts, adedsfondpen, montadedsfp, adedsturismo, montadedst, observaciones, cveusu, fechmodif) VALUES ('".$identrega."', ".$anioentrega.", ".$numentrega.", '".$descentrega."', 'ACTIVA', '".$fechentrega."', '0', '0', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, '".$fecha."', '".$cveusu."',";
                $consultaInsertEntr = $consultaInsertEntr . " '".$fecha."', '".$cveusu."', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '".$observaciones."', '".$cveusu."', '".$fecha."');";
                $statement = $this->db->prepare($consultaInsertEntr);
                $statement->execute();
                $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                $resulInsert["resultado"] = "Agregado";
                //return $results;
            } catch (\Throwable $th) {
                $resulInsert["resultado"] = "Error";
                echo $th;
            }
            return $resulInsert;
        }
        
        public function update_entrega($identrega,$numentrega,$anioentrega,$descentrega,$fechentrega,$observaciones,$cveusu){
            $resulUpdate = array();
            
            try {
                $fecha = date("Y-m-d");
                $datsInsert = array($numentrega, $anioentrega, $descentrega, $fechentrega, $observaciones, $cveusu, $fecha, $identrega);
                $statement = $this->db->prepare("UPDATE public.entregas_fonretyf SET numentrega=?, anioentrega=?, descentrega=?, fechentrega=?, observaciones=?, cveusu=?, fechmodif= ?  WHERE identrega=?");
                $statement->execute($datsInsert);
                $result = $statement->fetchAll();
                $resulUpdate["resultado"] = "Actualizado";
            } catch (\Throwable $th) {
                $resulUpdate["resultado"] = "Error";
                echo $th;
            }
            return $resulUpdate;
        }

        public function updateFechEntrega($identrega,$fechaEntrega,$usuario){
            $a_resultUpdFechEntrega = array();
            $fecha = "";
            $fecha = date("Y-m-d H:i:s");
            try {                                                                                                                                                                                                                                                                                                                                                                                                                                      
                $consultaUpdateEntr = "UPDATE public.entregas_fonretyf SET fechentrega='".$fechaEntrega."', cveusu='".$usuario."', fechmodif='".$fecha."' WHERE identrega='".$identrega."';";
                $consultaUpdateEntr = $this->db->prepare($consultaUpdateEntr);
                $consultaUpdateEntr->execute();
                $results = $consultaUpdateEntr->fetchAll(PDO::FETCH_ASSOC);              
                $a_resultUpdFechEntrega["updateEntrega"] = "Actualizado";
            } catch (\Throwable $th) {
                $a_resultUpdFechEntrega["updateEntrega"] = "Fallo";
            }

            try {                                                                                                                                                                                                                                                                                                                                                                                                                                      
                $consultaUpdateTram = "UPDATE public.tramites_fonretyf SET fechentrega='".$fechaEntrega."' WHERE identrega='".$identrega."';";
                $consultaUpdateTram = $this->db->prepare($consultaUpdateTram);
                $consultaUpdateTram->execute();
                $results = $consultaUpdateTram->fetchAll(PDO::FETCH_ASSOC);              
                $a_resultUpdFechEntrega["updateTramites"] = "Actualizado";
            } catch (\Throwable $th) {
                $a_resultUpdFechEntrega["updateTramites"] = "Fallo";
            }

            try {                                                                                                                                                                                                                                                                                                                                                                                                                                      
                $consultaUpdateCheqs = "UPDATE public.beneficiarios_cheques SET fechentrega='".$fechaEntrega."', fechcheque='".$fechaEntrega."' WHERE anioentrega=".substr($identrega,0,4)." and numentrega=".substr($identrega,4,2).";";
                $consultaUpdateCheqs = $this->db->prepare($consultaUpdateCheqs);
                $consultaUpdateCheqs->execute();
                $results = $consultaUpdateCheqs->fetchAll(PDO::FETCH_ASSOC);              
                $a_resultUpdFechEntrega["updateCheques"] = "Actualizado";
            } catch (\Throwable $th) {
                $a_resultUpdFechEntrega["updateCheques"] = "Fallo";
            }

            return $a_resultUpdFechEntrega;
        }

        public function get_parametros()
        {
            try {
                $statement = $this->db->prepare('SELECT * FROM public.parametros_retiro');
                $statement->execute();
                $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                return $results;
            } catch (\Throwable $th) {
                echo $th;
            }
            
        }

        public function updateEntrImpCheques($identrega){
            try {
                $consultaUpdateEntr = "UPDATE public.entregas_fonretyf SET impcheques=1, cheqsentre=1 WHERE identrega='".$identrega."';";
                $consultaUpdateEntr = $this->db->prepare($consultaUpdateEntr);
                $consultaUpdateEntr->execute();
                $results = $consultaUpdateEntr->fetchAll(PDO::FETCH_ASSOC);              
                $a_resultUpdFechEntrega["updateEntrega"] = "Actualizado";
            } catch (\Throwable $th) {
                //throw $th;
                echo $th;
            }
        }
		
		public function agregaCarpetas($identrega,$numcarpetas,$folsini,$folsfin,$obsrvscarp,$usuario){
			$fecha = "";
            $fecha = date("Y-m-d H:i:s");
			
			$consultaBorraCaprs = "DELETE FROM public.carpetas WHERE anioentrega=" . substr($identrega,0,4) . " and numentrega=" . substr($identrega,4,2) . ";" ;
			$consultaBorraCaprs = $this->db->prepare($consultaBorraCaprs);
            $consultaBorraCaprs->execute();
            $resultsCarps = $consultaBorraCaprs->fetchAll(PDO::FETCH_ASSOC);
			
			$a_resultInserts = array();
			
			$numerocarpetas = count($numcarpetas);
			for($i=0 ; $i < $numerocarpetas ; $i++){
				$idcarpeta = "E".substr($identrega,4,2)."-".substr($identrega,0,4)."-C".$numcarpetas[$i];
				$consultaInsertCarpeta = "INSERT INTO public.carpetas(anioentrega, numentrega, numcarpeta, idcarpeta, folini, folfin, folioscarp, estatcomplet, estatarchiv, estatrevcontab, observaciones, fecharchivcontab, cveusu, fechmodif)VALUES ";
				try{
					$consultaInsertCarpeta = $consultaInsertCarpeta . "(".substr($identrega,0,4).",".substr($identrega,4,2).",".$numcarpetas[$i].",'".$idcarpeta."','".$folsini[$i]."','".$folsfin[$i]."','".$folsini[$i]."-".$folsfin[$i]."','COMPLETA','CONTAB','REVISADA','".$obsrvscarp[$i]."','1900-01-01','".$usuario."','".$fecha."');";
					$consultaInsertCarpeta = $this->db->prepare($consultaInsertCarpeta);
					$consultaInsertCarpeta->execute();
					$resultsInsertCarps = $consultaInsertCarpeta->fetchAll(PDO::FETCH_ASSOC);
					array_push($a_resultInserts,"A"); 
				}catch (\Throwable $th) {
					echo $th;
					array_push($a_resultInserts,"F"); 
					//$a_resultInserts["agregado"] = $i;
				}
			}
			return $a_resultInserts;
		}
		
		public function validExistFols($folioI,$folioF){
			$FI = intval($folioI);
			$FF = intval($folioF);
			$a_resultFolsInexist = array();
			$existentes = array();
			$inexistentes = array();
			
			for($i=$FI ; $i <= $FF ; $i++){
			
				$consultaExistCheq = "SELECT idbenefcheque,folcheque FROM public.beneficiarios_cheques WHERE folcheque='00".$i."'";
				try{
					$consultaExistFol = $this->db->prepare($consultaExistCheq);
					$consultaExistFol->execute();
					$resultExistFol = $consultaExistFol->fetchAll(PDO::FETCH_ASSOC);
				}catch (\Throwable $th) {
					echo $th;
				}
				if(!empty($resultExistFol)){
					array_push($existentes, array("00" . $resultExistFol[0]['folcheque'],"beneficiarios_cheques"));
				}else{
					$consultaExistCheq = "SELECT idbenefcheque,folcheque FROM public.beneficiarios_cheques_hist WHERE folcheque='00".$i."'";
					try{
						$consultaExistFol = $this->db->prepare($consultaExistCheq);
						$consultaExistFol->execute();
						$resultExistFol = $consultaExistFol->fetchAll(PDO::FETCH_ASSOC);
					}catch (\Throwable $th) {
						echo $th;
					}
					if(!empty($resultExistFol)){
						array_push($existentes, array("00" . $resultExistFol[0]['folcheque'],"beneficiarios_cheques_hist")); 
					}else{
						$consultaExistCheq = "SELECT idret,folcheque FROM public.cheqs_cancelados WHERE folcheque='00".$i."'";
						try{
							$consultaExistFol = $this->db->prepare($consultaExistCheq);
							$consultaExistFol->execute();
							$resultExistFol = $consultaExistFol->fetchAll(PDO::FETCH_ASSOC);
						}catch (\Throwable $th) {
							echo $th;
						}
						if(!empty($resultExistFol)){
							array_push($existentes, array("00" . $resultExistFol[0]['folcheque'],"cheqs_cancelados"));  
						}else{
							$consultaExistCheq = "SELECT idbenefcheque,folio FROM public.adm_chqs WHERE folio='00".$i."'";
							try{
								$consultaExistFol = $this->db->prepare($consultaExistCheq);
								$consultaExistFol->execute();
								$resultExistFol = $consultaExistFol->fetchAll(PDO::FETCH_ASSOC);
							}catch (\Throwable $th) {
								echo $th;
							}
							if(!empty($resultExistFol)){
								array_push($existentes, array("00" . $resultExistFol[0]['folio'],"adm_chqs"));  
							}else{
								$inexistentes[] = "00".$i;
							}							
						}
					}
				}
			}
			
			$a_resultFolsInexist[] = $existentes;
			$a_resultFolsInexist[] = $inexistentes;
		
			return $a_resultFolsInexist;
		}
		
		
		public function addFolsInexs($folCheq,$nomMae,$nomBenef,$montBenef,$observCheque,$concepCheq,$estatCheq,$usuario){
			$fecha = "";
            $fecha = date("Y-m-d H:i:s");
			$resultAdd = array();
			
			try{
				$consultaFol = "SELECT id,folio FROM public.adm_chqs WHERE folio='".$folCheq."'";
				$consultaFol = $this->db->prepare($consultaFol);
				$consultaFol->execute();
				$consultaFol = $consultaFol->fetchAll(PDO::FETCH_ASSOC);
				if(count($consultaFol) > 0){
					$resultAdd["insercion"] = 'existente';
				}else{
					$consultaAddFol = "INSERT INTO public.adm_chqs(anioentrega, numentrega, idbenefcheque, folio, concepto, estatuscheq, observcnscheqs, numcarpeta, cveusureg, fechreg, nombenef, nommae, montbenef) VALUES (";
					$consultaAddFol = $consultaAddFol . "0,0,'','".$folCheq."','".$concepCheq."','".$estatCheq."','".$observCheque."','','".$usuario."','".$fecha."','".$nomBenef."','".$nomMae."',".$montBenef.");";
					$addFolInexist = $this->db->prepare($consultaAddFol);
					$addFolInexist->execute();
					$addFolInexist = $addFolInexist->fetchAll(PDO::FETCH_ASSOC);
					$resultAdd["insercion"] = 'agregado';
				}				
			}catch (\Throwable $th) {
				echo $th;
				$resultAdd["insercion"] = 'fallo';
			}
			return $resultAdd;
		}
		

    }

?>