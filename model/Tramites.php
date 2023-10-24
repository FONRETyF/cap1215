<?php

use function PHPSTORM_META\type;
    session_start();

    require_once("/var/www/html/cap1215/model/formularioTram.php");


    class Tramite extends formularioTram{
        private $db;
        private $cantidadLetra;
        private $retiros;
        
        public function __construct(){
            require_once("/var/www/html/cap1215/config/dbfonretyf.php");
            require_once("/var/www/html/cap1215/model/cantidadLetras.php");
            $this->cantidadLetra = new cantidadLetras();
            $pdo = new dbfonretyf();
            $this->db=$pdo->conexfonretyf();
            $this->retiros = array();
        }

        public function get_Retiro($aniosserv,$fechBaja){
            $statement = $this->db->prepare("SELECT aportprom FROM public.parametros_retiro WHERE estatparam='ACTIVO'");
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            foreach ($results as $row){
                $montprom = substr($row['aportprom'],1,strlen($row['aportprom'])-1);
            }
            $result = $this->calculaRet($aniosserv,$montprom,$fechBaja);
            return $result;
        }  

        public function get_RetiroJub($aniosserv,$programfallec){
            $retiroJub = array();
            if ($programfallec == "M") {
                if ($aniosserv > 29) {
                    $montretJub = 30000;
                    $retiroJub[] = [
                        "montRet" => $montretJub
                    ];
                }else {
                    $montretJub = $aniosserv * 1000;
                    $retiroJub[] = [
                        "montRet" => $montretJub
                    ];
               } 
            } else {
                # code...
            }
            
            return $retiroJub;
        }  

        public function get_retiro_Id($cvemae){
            $statement = $this->db->prepare("SELECT * FROM public.tramites_fonretyf_hist WHERE cvemae='". $cvemae."'");
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
          
            return $results;
        }
    
        public function obtenMax($identrega){
            $statementIdRet = $this->db->prepare("SELECT MAX(idret) as numtram from public.tramites_fonretyf_hist where identrega='" . $identrega . "'");
            $statementIdRet->execute();
            $results = $statementIdRet->fetchAll();
            if (is_null($results[0]['numtram'])) {
                $idret = 1;
            } else {
                $idret = $results[0]['numtram'] + 1;
            }
            return $idret;
        }
    
        public function obteIdEntrRet($identrega,$idretiro){
            if ($idretiro <10) {
                $identret = $identrega . "000". $idretiro;
            }elseif ($idretiro > 9 && $idretiro < 100) {
                $identret = $identrega . "00". $idretiro;
            }elseif ($idretiro > 99 && $idretiro < 1000) {
                $identret = $identrega . "0". $idretiro;
            }elseif ($idretiro > 999) {
                $identret = $identrega . $idretiro;
            }
            return $identret;
        }
    
        public function get_benef_cvemae($cvemae){
            $statement = $this->db->prepare("SELECT cvemae FROM public.beneficiarios_maestros WHERE cvemae= ?");
            $statement->bindValue(1,$cvemae);
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            return $results;
        }
    
        public function addTramiteJI_Hist($anioentr,$numentre,$identr,$cvemae,$cveissemym,$motvret,$apepat,$apemat,$nombre,$nomcom,$region,$numdictam,$fechdictam,$fechbajfall,$nomsolic,$fechbase,$aniosserv,$montrettot,$fechrecib,$curpmae,$rfcmae,$observaciones,$folcheque,$cveusu){
            
            require_once("/var/www/html/cap1215/model/Entregas.php");
            require_once("/var/www/html/cap1215/model/Maestro.php");
            $entrega = new Entrega();
            $maestro = new Maestro();
    
            $a_resultAddTram = array();
            $get_ret = $this->get_retiro_Id($cvemae);
            $get_entrega = $entrega -> get_entrega_id($identr);
           
            $fechaentrega=$get_entrega[0]["fechentrega"];
    
            if (count($get_ret)>0) {
                $a_resultAddTram["insertTramite"] = "Existente";
                return $a_resultAddTram;
            } else {
                $fecha = "";
                $fecha = date("Y-m-d H:i:s");
    
                $montrettotLet = $this->cantidadLetra->cantidadLetras($montrettot);
                                    
                $idretiro = $this->obtenMax($identr);
                $identregRet = $this->obteIdEntrRet($identr,$idretiro);
                
                try {                                                                                                                                                                                                                                                                                                                                                                                                                                      
                    $consultaAdd = "INSERT INTO public.tramites_fonretyf_hist(";
                    $consultaAdd = $consultaAdd . "anioentrega, numentrega, identrega, idret, identret, cvemae,motvret, numdictam, fechdictam,fechbajfall, nomsolic, numcelsolic, numpartsolic, docttestamnt, fechdocttestmnt, numjuicio, numbenef, numbeneffall, modretiro, montrettot, montretletra, montretsinads, montretentr, montretentrletra, montretfall, montretfallletra, observtrami, fechrecib, fechentrega, estattramite, tramtexcepcion, numoficioaut, fechautori,imgautori, proceautori, numadeds, montadeudos, adfajam, adts, adfondpension, adturismo, montretnepfall, foliotramite, cveusureg, fechreg, montsalmin, imgacuerdo, estatacuerdo, cveusumodif, fechmodif, histmodif, tiptramne, usupasohist, fechpasohist)";
                    $consultaAdd = $consultaAdd . " VALUES (".$anioentr.", ".$numentre.", '".$identr."', ".$idretiro.", '".$identregRet."', '".$cvemae."', '".$motvret."', '".$numdictam."', '".$fechdictam."', '".$fechbajfall."', '".$nomsolic."', '', '', '', '1900-01-01','', 1, 0, 'C', ".$montrettot.",'".$montrettotLet."',".$montrettot.", ".$montrettot.", '".$montrettotLet."', 0, '', '".$observaciones."', '".$fechrecib."', '".$fechaentrega."', 'PROCESADO', 0, '', '1900-01-01', '', '', 0, 0, 0, 0, 0, 0,0, '', '".$cveusu."','".$fecha."',0,'',0,'','1900-01-01','','0','".$cveusu."','".$fecha."')";
                    $consultaAdd = $this->db->prepare($consultaAdd);
                    $consultaAdd->execute();
                    $results = $consultaAdd->fetchAll(PDO::FETCH_ASSOC);              
                    $a_resultAddTram["insertTramite"] = "Agregado";
                } catch (\Throwable $th) {
                    echo $th;
                    $a_resultAddTram["insertTramite"] = "Fallo";
                }
                
                $get_mae = $maestro->get_maestro($cvemae);
                if (count($get_mae) > 0) {
                    $actualizaMae = $this->actualizaMaestroActHist($cvemae,$cveissemym,$region,$fechbase,$aniosserv,$fechbajfall,$motvret,$cveusu,$fecha,$curpmae,$rfcmae);
                    $a_resultAddTram["updateMaestro"] = $actualizaMae;
                } else {
                    $get_insertMae = $maestro->insertMae($cvemae,$cveissemym,$apepat,$apemat,$nombre,$nomcom,$curpmae,$rfcmae,$region,$cveusu);
                    
                    if ($get_insertMae["insertMae"] == "Agregado") {
                        $actualizaMae = $this->actualizaMaestroActHist($cvemae,$cveissemym,$region,$fechbase,$aniosserv,$fechbajfall,$motvret,$cveusu,$fecha,$curpmae,$rfcmae);
                        $a_resultAddTram["updateMaestro"] = $actualizaMae;
                    } else {
                        # code...
                    }
                }
                    
                $numbenefs = 1;
                $nombreBenef[] =$nomsolic; 
                $estatEdad[] = "M";
                $porcsBenef[] = "100";
                $insertaCheque = $this->insertChequeHist($anioentr,$numentre,$idretiro,$identregRet,$cvemae,$nombreBenef,$numbenefs,$montrettot,$estatEdad,$porcsBenef,$cveusu,$fecha,$motvret,$folcheque,$fechaentrega);
                $a_resultAddTram["insertCheque"] = $insertaCheque;
    
                if ($a_resultAddTram["insertTramite"] == "Agregado" && $a_resultAddTram["updateMaestro"] == "Actualizado" && $a_resultAddTram["insertCheque"] == "Agregado" ) {
                    if ($motvret=="I") {
                        $statementActEntr = "UPDATE public.entregas_fonretyf SET numtramites=". $get_entrega[0][12] + 1 .", numtraminha=". $get_entrega[0][13] + 1 .", monttotentr=". str_replace(",","",str_replace("$","",$get_entrega[0][29])) + $montrettot ."  WHERE identrega='".$identr."'";
                        $statementActEntr = $this->db->prepare($statementActEntr);
                        $statementActEntr->execute();
                        $resultsActEntr = $statementActEntr->fetchAll(PDO::FETCH_ASSOC);     
                    } elseif ($motvret=="J") {
                        $statementActEntr = "UPDATE public.entregas_fonretyf SET numtramites=". ($get_entrega[0][12] + 1) .", numtramjub=". ($get_entrega[0][14] + 1) .", monttotentr=". str_replace(",","",str_replace("$","",$get_entrega[0][29])) + $montrettot ."  WHERE identrega='".$identr ."'";
                        $statementActEntr = $this->db->prepare($statementActEntr);
                        $statementActEntr->execute();
                        $resultsActEntr = $statementActEntr->fetchAll(PDO::FETCH_ASSOC);     
                    } 
                }
                return $a_resultAddTram;
            }
        }

        public function addtramiteF_Hist($anioentr,$numentre,$identr,$cvemae,$cveissemym,$motvret,$apepat,$apemat,$nombre,$nomcom,$region,$fechbajfall,$nomsolic,$fechbase,$aniosserv,$montrettot,$fechrecib,$numbenefs,$testamento,$nomsbenefs,$curpsbenefs,$parentsbenefs,$porcsbenefs,$edadesbenefs,$vidabenefs,$fechtestamnt,$curpmae,$rfcmae,$observaciones,$folbenefs,$montbenefs,$cveusu){
            require_once("/var/www/html/cap1215/model/Entregas.php");
            require_once("/var/www/html/cap1215/model/Maestro.php");
            $entrega = new Entrega();
            $maestro = new Maestro();
    
            $a_resultAddTramF = array();
    
            $get_ret = $this->get_retiro_Id($cvemae);
            $get_benefs = $this->get_benef_cvemae($cvemae);
            $get_entrega = $entrega->get_entrega_id($identr);
            
            if (count($get_ret)>0 || count($get_benefs)>0) {
                $a_resultAddTramF["insertTramite"] = "Existente";
                return $a_resultAddTramF;
            } else {
                $fecha = "";
                $fecha = date("Y-m-d H:i:s");
    
                $montrettotLet = $this->cantidadLetra->cantidadLetras($montrettot);
               
                $idretiro = $this->obtenMax($identr);
                $identregRet = $this->obteIdEntrRet($identr,$idretiro);
            
                $benefsFallcs = 0;
                foreach ($vidabenefs as $row) {
                    if ($row == "F") {
                        $benefsFallcs++;
                    }                   
                }
    
                try {
                    $consultaAdd = "INSERT INTO public.tramites_fonretyf_hist(";
                    $consultaAdd = $consultaAdd . "anioentrega, numentrega, identrega, idret, identret, cvemae, motvret, numdictam, fechdictam, fechbajfall, nomsolic, numcelsolic, numpartsolic, docttestamnt, fechdocttestmnt, numjuicio, numbenef, numbeneffall, modretiro, montrettot, montretletra, montretsinads, montretentr, montretentrletra, montretfall, montretfallletra, observtrami, fechrecib, fechentrega, estattramite, tramtexcepcion, numoficioaut, fechautori, imgautori, proceautori, numadeds, montadeudos, adfajam, adts, adfondpension, adturismo, montretnepfall, foliotramite, cveusureg, fechreg, montsalmin, imgacuerdo, estatacuerdo, cveusumodif, fechmodif, histmodif, tiptramne, usupasohist, fechpasohist)";
                    $consultaAdd = $consultaAdd . " VALUES (".$anioentr.", ".$numentre.", '".$identr."', ".$idretiro.", '".$identregRet."', '".$cvemae."', '".$motvret."', '', '1900-01-01', '".$fechbajfall."', '".$nomsolic."', '', '', '".$testamento."', '".$fechtestamnt."', '', ".$numbenefs.", ".$benefsFallcs.", 'C', ".$montrettot.",'".$montrettotLet."', ".$montrettot.", ".$montrettot.", '".$montrettotLet."', 0, '', '".$observaciones."', '".$fechrecib."', '".$get_entrega[0]["fechentrega"]."', 'PROCESADO', 0, '', '1900-01-01', '', '', 0, 0, 0, 0, 0, 0, 0, '', '".$cveusu."','".$fecha."',0,'', 0,'','1900-01-01','','0','".$cveusu."','".$fecha."');";
                    
                    $consultaAdd = $this->db->prepare($consultaAdd);
                    $consultaAdd->execute();
                    $results = $consultaAdd->fetchAll(PDO::FETCH_ASSOC);
                    $a_resultAddTramF["insertTramite"] = "Agregado";
                    
                } catch (\Throwable $th) {
                    echo($th);
                    $a_resultAddTramF["insertTramite"] = "Existente";
                }
                
                $get_mae = $maestro->get_maestro($cvemae);
                if (count($get_mae) > 0) {
                    $actualizaMae = $this->actualizaMaestroActHist($cvemae,$cveissemym,$region,$fechbase,$aniosserv,$fechbajfall,$motvret,$cveusu,$fecha,$curpmae,$rfcmae);
                    $a_resultAddTram["updateMaestro"] = $actualizaMae;
                } else {
                    $get_insertMae = $maestro->insertMae($cvemae,$cveissemym,$apepat,$apemat,$nombre,$nomcom,$curpmae,$rfcmae,$region,$cveusu);
                    
                    if ($get_insertMae["insertMae"] == "Agregado") {
                        $actualizaMae = $this->actualizaMaestroActHist($cvemae,$cveissemym,$region,$fechbase,$aniosserv,$fechbajfall,$motvret,$cveusu,$fecha,$curpmae,$rfcmae);
                        $a_resultAddTram["updateMaestro"] = $actualizaMae;
                    } else {
                        # code...
                    }
                }

                //$actualizaMae = $this->actualizaMaestroActHist($cvemae,$cveissemym,$region,$fechbase,$aniosserv,$fechbajfall,$motvret,$cveusu,$fecha,$curpmae,$rfcmae);
                //$a_resultAddTramF["updateMaestro"] = $actualizaMae;
                
                $insertaCheques = $this->insertChequeFHist($anioentr,$numentre,$idretiro,$identregRet,$cvemae,$nomsbenefs,$numbenefs,$montrettot,$edadesbenefs,$porcsbenefs,$vidabenefs,$cveusu,$fecha,$motvret,$folbenefs,$montbenefs,$get_entrega[0]["fechentrega"]);
                $a_resultAddTramF["insertCheque"] = $insertaCheques;
    
                $insertaBenefsMae = $this -> insertBeneficiaroisMaeHist($anioentr,$numentre,$idretiro,$identregRet,$cvemae,$nomsbenefs,$numbenefs,$montretentr,$curpsbenefs,$parentsbenefs,$edadesbenefs,$porcsbenefs,$vidabenefs,$cveusu,$fecha,$motvret);
                $a_resultAddTramF["insertBenefs"] = $insertaBenefsMae;
            }
    
            if ($a_resultAddTramF["insertTramite"] == "Agregado" && $a_resultAddTramF["updateMaestro"] == "Actualizado" && $a_resultAddTramF["insertCheque"] == "Agregado" && $a_resultAddTramF["insertBenefs"] == "Agregado" ) {
                $statementActEntr = "UPDATE public.entregas_fonretyf SET numtramites=". $get_entrega[0][12] + 1 .", numtramfall=". $get_entrega[0][15] + 1 .", numtramfallact=".$get_entrega[0][16] + 1 .", monttotentr=". str_replace(",","",str_replace("$","",$get_entrega[0][29])) + $montrettot ."  WHERE identrega='".$identr."'";
                $statementActEntr = $this->db->prepare($statementActEntr);
                $statementActEntr->execute();
                $resultsActEntr = $statementActEntr->fetchAll(PDO::FETCH_ASSOC);      
            }
            return $a_resultAddTramF;
        }
    
    
        public function addtramiteFJ_Hist($anioentr,$numentre,$identr,$cveissemym,$motvret,$apepat,$apemat,$nombre,$nomcom,$region,$fechbajfall,$nomsolic,$fechbase,$aniosserv,$montrettot,$fechrecib,$numbenefs,$testamento,$nomsbenefs,$curpsbenefs,$parentsbenefs,$porcsbenefs,$edadesbenefs,$vidabenefs,$curpmae,$rfcmae,$fechtestamnt,$observaciones,$folbenefs,$montbenefs,$cveusu){
            require_once("/var/www/html/cap1215/model/Entregas.php");
            require_once("/var/www/html/cap1215/model/Maestro.php");
            $entrega = new Entrega();
            $maestro = new Maestro();
    
            $get_entrega = $entrega -> get_entrega_id($identr);
    
            $a_resultAddTramFJ = array();
    
            $get_ret = $this->get_retiro_Id($cveissemym);
            $get_benefs = $this->get_benef_cvemae($cveissemym);
    
            if (count($get_ret)>0 || count($get_benefs)>0) {
                $a_resultAddTramFJ["insertTramite"] = "Existente";
                return $a_resultAddTramFJ;
            } else {
                $fecha = "";
                $fecha = date("Y-m-d H:i:s");
    
                $montrettotLet = $this->cantidadLetra->cantidadLetras($montrettot);
               
                $idretiro = $this->obtenMax($identr);
                $identregRet = $this->obteIdEntrRet($identr,$idretiro);
                
                $benefsFallcs = 0;
                foreach ($vidabenefs as $row) {
                    if ($row == "F") {
                        $benefsFallcs++;
                    }                   
                }
    
                try {
                    $consultaAdd = "INSERT INTO public.tramites_fonretyf_hist(";
                    $consultaAdd = $consultaAdd . "anioentrega, numentrega, identrega, idret, identret, cvemae, motvret, numdictam, fechdictam, fechbajfall, nomsolic, numcelsolic, numpartsolic, docttestamnt, fechdocttestmnt, numjuicio, numbenef, numbeneffall, modretiro, montrettot, montretletra, montretsinads, montretentr, montretentrletra, montretfall, montretfallletra, observtrami, fechrecib, fechentrega, estattramite, tramtexcepcion, numoficioaut, fechautori, imgautori, proceautori, numadeds, montadeudos, adfajam, adts, adfondpension, adturismo, montretnepfall, foliotramite, cveusureg, fechreg, montsalmin, imgacuerdo, estatacuerdo, cveusumodif, fechmodif, histmodif, tiptramne, usupasohist, fechpasohist)";
                    $consultaAdd = $consultaAdd . " VALUES (".$anioentr.", ".$numentre.", '".$identr."', ".$idretiro.", '".$identregRet."', '".$cveissemym."', '".$motvret."', '', '1900-01-01', '".$fechbajfall."', '".$nomsolic."', '', '', '".$testamento."', '".$fechtestamnt."', '', ".$numbenefs.", ".$benefsFallcs.", 'C', ".$montrettot.",'". $montrettotLet . "', ".$montrettot.", ".$montrettot.",'". $montrettotLet."', 0, '', '".$observaciones."', '".$fechrecib."', '".$get_entrega[0]["fechentrega"]."', 'PROCESADO', 0, '', '1900-01-01', '', '', 0, 0, 0, 0, 0, 0, 0, '', '".$cveusu."','".$fecha."',0,'',0,'','1900-01-01','','0','".$cveusu."','".$fecha."');";
                    $consultaAdd = $this->db->prepare($consultaAdd);
                    $consultaAdd->execute();
                    $results = $consultaAdd->fetchAll(PDO::FETCH_ASSOC);
                        
                    $a_resultAddTramFJ["insertTramite"] = "Agregado";
                        
                } catch (\Throwable $th) {
                    $a_resultAddTramFJ["insertTramite"] = "Existente";
                }
                
                /**** */
                $get_mae = $maestro->get_maestroJub($cveissemym);
                if (count($get_mae) > 0) {
                    $actualizaMae = $this->actualizaMaestroMutHist($cveissemym,$curpmae,$rfcmae,$region,$aniosserv,$fechbajfall,$motvret,$cveusu,$fecha,$fechbase);
                    $a_resultAddTramFJ["updateMaestro"] = $actualizaMae;
                } else {
                    $get_insertMaeJub = $maestro->insertMaeJub($cveissemym,$apepat,$apemat,$nombre,$nomcom,$cveusu);
                    if ($get_insertMaeJub["insertMaeJub"] == "Agregado") {
                        $get_insertMae = $maestro->insertMaeJubMut($cveissemym,$apepat,$apemat,$nombre,$nomcom,$curpmae,$rfcmae,$fechbase,$fechbajfall,$aniosserv,$region,$cveusu);
                        if ($get_insertMae["insertMaeJubMut"] == "Agregado") {
                            $actualizaMae = $this->actualizaMaestroMutHist($cveissemym,$curpmae,$rfcmae,$region,$aniosserv,$fechbajfall,$motvret,$cveusu,$fecha,$fechbase);
                            $a_resultAddTramFJ["updateMaestro"] = $actualizaMae;
                        } else {
                            # code...
                        }
                    } else {
                        # code...
                    }
                }
                /**** */

                $insertaCheques = $this->insertChequeFHist($anioentr,$numentre,$idretiro,$identregRet,$cveissemym,$nomsbenefs,$numbenefs,$montrettot,$edadesbenefs,$porcsbenefs,$vidabenefs,$cveusu,$fecha,$motvret,$folbenefs,$montbenefs,$get_entrega[0]["fechentrega"]);
                $a_resultAddTramFJ["insertCheque"] = $insertaCheques;
    
                $insertaBenefsMae = $this -> insertBeneficiaroisMaeHist($anioentr,$numentre,$idretiro,$identregRet,$cveissemym,$nomsbenefs,$numbenefs,$montretentr,$curpsbenefs,$parentsbenefs,$edadesbenefs,$porcsbenefs,$vidabenefs,$cveusu,$fecha,$motvret);
                $a_resultAddTramFJ["insertBenefs"] = $insertaBenefsMae;
            }
                
            if ($a_resultAddTramFJ["insertTramite"] == "Agregado" && $a_resultAddTramFJ["updateMaestro"] == "Actualizado" && $a_resultAddTramFJ["insertCheque"] == "Agregado" && $a_resultAddTramFJ["insertBenefs"] == "Agregado" ) {
                $statementActEntr = "UPDATE public.entregas_fonretyf SET numtramites=". $get_entrega[0][12] + 1 .", numtramfall=". $get_entrega[0][15] + 1 .", numtramfalljubm=".$get_entrega[0][17] + 1 .", monttotentr=". str_replace(",","",str_replace("$","",$get_entrega[0][29])) + $montrettot ."  WHERE identrega='".$identr."'";
                $statementActEntr = $this->db->prepare($statementActEntr);
                $statementActEntr->execute();
                $resultsActEntr = $statementActEntr->fetchAll(PDO::FETCH_ASSOC);      
            }
    
            return $a_resultAddTramFJ;
        }
    
        
        public function insertChequeHist($anioentr,$numentr,$idret,$identreret,$cvemae,$nombenefs,$numbenef,$montretentr,$estatEdad,$porcsBenef,$usuario,$fecha,$motivret,$folcheque,$fechaentrega){
           
            for ($i=0; $i < $numbenef; $i++) { 
                $idbenef = $i + 1;
                if ($idbenef < 10) {
                    $idbenefcheque = $identreret . "0" . $idbenef;
                }elseif ($idbenef > 9) {
                    $idbenefcheque = $identreret . $idbenef;
                }
                $montbenefletra = $this->cantidadLetra->cantidadLetras($montretentr);
                try {
                    $statementInsertCheque = "INSERT INTO public.beneficiarios_cheques_hist(";
                    $statementInsertCheque = $statementInsertCheque . "anioentrega, numentrega, idret, identret, idbenef, idbenefcheque, cvemae, nombenef, montbenef, montbenefletra, folcheque, fechcheque, fechreposcn, folanterior, oficsolrepofinan, usureposcn, observreposcn, fechentrega, estatcheque, observcheque, movimtscheque, motvcancel, fechcancel, porcretbenef, statedad, chequeadeudo, adeudo, cveusu, fechmodif, cveusucancel, tipimpcheq)";
                    $statementInsertCheque = $statementInsertCheque . " VALUES (".$anioentr.", ".$numentr.", ".$idret.", '".$identreret."', ".$idbenef.", '".$idbenefcheque."', '".$cvemae."', '".$nombenefs[$i]."', ".$montretentr.", '".$montbenefletra."', '00".$folcheque."', '".$fechaentrega."', '1900-01-01', '', '', '', '', '".$fechaentrega."', 'ENTREGADO', '', '', 0, '1900-01-01', ".$porcsBenef[$i].", '".$estatEdad[$i]."', 'N', '', '".$usuario."', '".$fecha."', '', '0');";
                    $statementInsertCheque = $this->db->prepare($statementInsertCheque);
                    $statementInsertCheque->execute();
                    $results = $statementInsertCheque->fetchAll(PDO::FETCH_ASSOC);
                    $resultInsertCheque = "Agregado";
                    return $resultInsertCheque;
                } catch (\Throwable $th) {
                    $resultInsertCheque = "Fallo";
                    return $resultInsertCheque;
                }            
            }
        }
                                                
        public function actualizaMaestroActHist($cvemae,$cveissemym,$region,$fechbase,$aniosserv,$fechbaja,$motivret,$usuario,$fecha,$curpmae,$rfcmae){
            if ($modalret == "C") {
                $afifonfall = 0;
            }else {
                $afifonfall = 1;
            }
                        
            $fechaini=str_replace('"','',$fechinipsgs);
            $fechafin=str_replace('"','',$fechfinpsgs);
    
            if ($motivret == "J" || $motivret == "I") {
                try {
                    $statementUpdate = "UPDATE public.maestros_smsem";
                    $statementUpdate = $statementUpdate . " SET cveissemym='".$cveissemym."', curpmae='".$curpmae."', rfcmae='".$rfcmae."', regescmae= ".$region ." , fcbasemae='".$fechbase."', aservactmae=".$aniosserv.", fbajamae='".$fechbaja."', estatlabmae='". $motivret ."', cveusu='".$usuario."', fechmodif='".$fecha."'";
                    $statementUpdate = $statementUpdate . " WHERE csp='" . $cvemae."';";
                    $statementUpdate = $this->db->prepare($statementUpdate);
                    $statementUpdate->execute();
                    $results = $statementUpdate->fetchAll(PDO::FETCH_ASSOC);
                    $resultUpdMaestro = "Actualizado";
                } catch (\Throwable $th) {
                    $resultUpdMaestro = "Fallo";
                    echo($th);
                    
                }
            } else {
                try {
                    $statementUpdate = "UPDATE public.maestros_smsem";
                    $statementUpdate = $statementUpdate . " SET cveissemym='".$cveissemym."', curpmae='".$curpmae."', rfcmae='".$rfcmae."', regescmae= ".$region ." , fcbasemae='".$fechbase."', aservactmae=".$aniosserv.", fbajamae='".$fechbaja."', fechfallecmae='".$fechbaja."', estatlabmae='". $motivret ."', cveusu='".$usuario."', fechmodif='".$fecha."'";
                    $statementUpdate = $statementUpdate . " WHERE csp='" . $cvemae."';";
                    $statementUpdate = $this->db->prepare($statementUpdate);
                    $statementUpdate->execute();
                    $results = $statementUpdate->fetchAll(PDO::FETCH_ASSOC);
                    $resultUpdMaestro = "Actualizado";
                } catch (\Throwable $th) {
                    $resultUpdMaestro = "Fallo";
                    echo($th);
                }
            }
            return $resultUpdMaestro;
        }
    
        
        public function actualizaMaestroMutHist($cveissemym,$curpmae,$rfcmae,$region,$aniosserv,$fechbajfall,$motvret,$cveusu,$fecha,$fechbase){
            try {
                $statementUpdate = "UPDATE public.mutualidad";
                $statementUpdate = $statementUpdate . " SET curpmae='".$curpmae."' ,rfcmae='".$rfcmae."', regmae= ".$region ." , fechbajamae='".$fechbase."', fcfallecmae='".$fechbajfall."', estatmutual='F', aniosjub=".$aniosserv.", cveusu='".$cveusu."', fechmodif='".$fecha."', estatusmae='F'";
                $statementUpdate = $statementUpdate . " WHERE cveissemym='" . $cveissemym."';";
                $statementUpdate = $this->db->prepare($statementUpdate);
                $statementUpdate->execute();
                $results = $statementUpdate->fetchAll(PDO::FETCH_ASSOC);
                $resultUpdMaestro = "Actualizado";
                return $resultUpdMaestro;
            } catch (\Throwable $th) {
                echo($th);
                $resultUpdMaestro = "Fallo";
                return $resultUpdMaestro;
            }
        }
    
    
        public function insertChequeFHist($anioentr,$numentr,$idret,$identreret,$cvemae,$nombenefs,$numbenef,$montretentr,$estatEdad,$porcsBenef,$estatVida,$usuario,$fecha,$motivret,$folbenefs,$montbenefs,$fechaentrega){
            $validInsertCorrect = 0;
            $validInserError = 0;
            $numbeneffall = 0;
            for ($i=0; $i < $numbenef; $i++) { 
                $idbenef = $i + 1;
                if ($idbenef < 10) {
                    $idbenefcheque = $identreret . "0" . $idbenef;
                }elseif ($idbenef > 9) {
                    $idbenefcheque = $identreret . $idbenef;
                }
    
                $montbenefletra = $this->cantidadLetra->cantidadLetras($montbenefs[$i]);
                try {
                    $statementInsertCheque = "INSERT INTO public.beneficiarios_cheques_hist(";
                    $statementInsertCheque = $statementInsertCheque . "anioentrega, numentrega, idret, identret, idbenef, idbenefcheque, cvemae, nombenef, montbenef, montbenefletra, folcheque, fechcheque, fechreposcn, folanterior, oficsolrepofinan, usureposcn, observreposcn, fechentrega, estatcheque, observcheque, movimtscheque, motvcancel, fechcancel, porcretbenef, statedad, chequeadeudo, adeudo, cveusu, fechmodif, usupasohist, fechpasohist, cveusucancel, tipimpcheq)";
                    $statementInsertCheque = $statementInsertCheque . " VALUES (".$anioentr.", ".$numentr.", ".$idret.", '".$identreret."', ".$idbenef.", '".$idbenefcheque."', '".$cvemae."', '".$nombenefs[$i]."', ".$montbenefs[$i].", '".$montbenefletra."', '00".$folbenefs[$i]."', '".$fechaentrega."', '1900-01-01', '', '', '', '', '".$fechaentrega."', 'ENTREGADO', '', '', 0, '1900-01-01', ".$porcsBenef[$i].", '".$estatEdad[$i]."','N', '', '".$usuario."', '".$fecha."','".$usuario."', '".$fecha."', '', '0');";
                    $statementInsertCheque = $this->db->prepare($statementInsertCheque);
                    $statementInsertCheque->execute();
                    $results = $statementInsertCheque->fetchAll(PDO::FETCH_ASSOC);
                    $validInsertCorrect++;
                } catch (\Throwable $th) {
                    echo $th;
                    $validInserError++;
                }
    
                if ($estatVida[$i] == "F") {
                    $numbeneffall++;
                }             
            }
    
            if ($validInsertCorrect == $numbenef) {
                $resultInsertCheque = "Agregado";
            } elseif ($validInserError > 0) {
                $resultInsertCheque = "Fallo";
            }
            return $resultInsertCheque;
        }
    
        public function insertBeneficiaroisMaeHist($anioentr,$numentr,$idret,$identreret,$cvemae,$nombenefs,$numbenef,$montretentr,$curps,$parentescos,$estatEdad,$porcsBenef,$estatvida,$usuario,$fecha,$motivret){
            $validInsertCorrect = 0;
            $validInserError = 0;
            for ($i=0; $i < $numbenef; $i++) { 
                $idbenef = $i + 1;
                if ($idbenef < 10) {
                    $idbenefcheque = $identreret . "0" . $idbenef;
                }elseif ($idbenef > 9) {
                    $idbenefcheque = $identreret . $idbenef;
                }
    
                try {
                    $statementInsertCheque = "INSERT INTO public.beneficiarios_maestros(";
                    $statementInsertCheque = $statementInsertCheque . "anioentrega, numentrega, idret, identret, idbenef, idbenefcheque, cvemae, motvret, nombenef, curpbenef, parentbenef, porcretbenef, edadbenef, vidabenef, cveusureg, fechreg)";
                    $statementInsertCheque = $statementInsertCheque . " VALUES (".$anioentr.", ".$numentr.", ".$idret.", '".$identreret."', ".$idbenef.", '".$idbenefcheque."', '".$cvemae."', '".$motivret."', '".$nombenefs[$i]."', '".$curps[$i]."', '".$parentescos[$i]."' , ".$porcsBenef[$i].",'".$estatEdad[$i]."','".$estatvida[$i]."', '".$usuario."', '".$fecha."');";
                    $statementInsertCheque = $this->db->prepare($statementInsertCheque);
                    $statementInsertCheque->execute();
                    $results = $statementInsertCheque->fetchAll(PDO::FETCH_ASSOC);
                    $validInsertCorrect++;
                } catch (\Throwable $th) {
                    $validInserError++;
                }              
            }
            if ($validInsertCorrect == $numbenef) {
                $resultInsertCheque = "Agregado";
                return $resultInsertCheque;
            } elseif ($validInserError > 0) {
                $resultInsertCheque = "Fallo";
                return $resultInsertCheque;
            }
        }

    }


?>
