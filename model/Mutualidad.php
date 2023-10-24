<?php
    session_start();

    class Mutualidad{
        private $db;
        private $mutualidad;
        
        public function __construct()
        {
            require_once("/var/www/html/cap1215/config/dbfonretyf.php");
            $pdo = new dbfonretyf();
            $this->db=$pdo->conexfonretyf();
            $this->mutualidad = array();
        }

        public function get_emisiones()
        {
            try {
                $consulta = "SELECT numemision,anioemision,idemision,descemision,numafis,estatemi FROM public.emision_mut ORDER BY idemision desc";
                $statement = $this->db->prepare($consulta);
                $statement->execute();
                $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                return $results;
            } catch (\Throwable $th) {
                echo $th;
            }
            
        }

        public function get_solicitudes($idemision){
            try {
                $consulta = "SELECT idcapmutu,cveissemym,nomcommae,fechafimutu,estatmutual FROM public.mutualidad WHERE anioemision=".substr($idemision,0,4)." and numemision=".intval(substr($idemision,4,2))." ORDER BY nomcommae asc;";
                $statement = $this->db->prepare($consulta);
                $statement->execute();
                $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                return $results;
            } catch (\Throwable $th) {
                echo $th;
            }
            
        }

        public function delete_emision($idemision){
            try {
                $statement = $this->db->prepare('DELETE FROM public.emision_mut WHERE idemision = ?');
                $statement->bindValue(1,$idemision);
                $statement->execute();
                $result = $statement->fetchAll();
                return $result;
            } catch (\Throwable $th) {
                echo $th;
            }
            
        }

        public function get_emision_id($idemision){
            try {
                $statement = $this->db->prepare("SELECT * FROM public.emision_mut WHERE idemision= ?");
                $statement->bindValue(1,$idemision);
                $statement->execute();
                return $result = $statement->fetchAll();
            } catch (\Throwable $th) {
                echo $th;
            }
        }

        public function insert_emision($idemision,$numemision,$anioemision,$fechEmision,$cveusu,$descemision,$observemi){
            $fecha = date("Y-m-d");
            $resulInsert = array();
            try {
                $consultaInsertEmis = "INSERT INTO public.emision_mut(numemision, anioemision, idemision, descemision, iniresepcion, finresepcion, numafis, numafisapli, numafisnoapli, fechenvio, oficioenvio, fechaplidesc, estatemi, observemi, cveusureg, fechreg, cveusumodif, fechmodif) VALUES (";
                $consultaInsertEmis = $consultaInsertEmis . $numemision.",".$anioemision.", '".$idemision."', '".$descemision."', '".$fechEmision."', '1900-01-01', 0, 0, 0, '1900-01-01', '', '1900-01-01', 'A', '', '".$cveusu."', '".$fecha."', '','1900-01-01');";
                $statement = $this->db->prepare($consultaInsertEmis);
                $statement->execute();
                $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                $resulInsert["resultado"] = "Agregado";
            } catch (\Throwable $th) {
                $resulInsert["resultado"] = "Error";
                echo $th;
            }
            return $resulInsert;
        }

        public function update_emision($idemision,$numemision,$anioemision,$fechEmision,$cveusu,$descemision,$observemi){
            $resulUpdate = array();
            try {
                $fecha = date("Y-m-d");
                $consultaUpdateEmis = "UPDATE public.emision_mut SET numemision=".$numemision.", anioemision=".$anioemision.", descemision='".$descemision."', iniresepcion='".$fechEmision."', observemi='".$observemi."', cveusumodif='".$cveusu."', fechmodif= '".$fecha."'  WHERE idemision='".$idemision."';";
                $statement = $this->db->prepare($consultaUpdateEmis);
                $statement->execute();
                $result = $statement->fetchAll();
                $resulUpdate["resultado"] = "Actualizado";
            } catch (\Throwable $th) {
                $resulUpdate["resultado"] = "Error";
                echo $th;
            }
            return $resulUpdate;
        }
        
        public function getprogramJub($cveissemym){
            try {
                $consulta= "SELECT programfallec,nomcomjub FROM public.jubilados_smsem WHERE cveissemym='".$cveissemym."'";
                $statement = $this->db->prepare($consulta);
                $statement->execute();
                return $result = $statement->fetchAll();
            } catch (\Throwable $th) {
                echo $th;
            }
        }

        public function getEdoCtaJub($cveissemym,$programfallec){
            if ($programfallec=="M") {
                try {
                    $consulta= "SELECT numaport,anioultaport FROM public.edoscta_mut WHERE cveissemym='".$cveissemym."'";
                    $statement = $this->db->prepare($consulta);
                    $statement->execute();
                    return $result = $statement->fetchAll();
                } catch (\Throwable $th) {
                    echo $th;
                }
            } else {
                # code...
            }
             
        }

        public function updateEdoCtaMut($cveissemym,$numaporant,$numaport,$anioultaport,$cveusu){
            $resultUpdate = array();
            $fecha = date("Y-m-d");
            try {
                $consulta= "UPDATE public.edoscta_mut SET numaport=".($numaporant + $numaport).", montaport=".(($numaporant + $numaport)*12).", anioultaport=".$anioultaport.", cveusumodif='".$cveusu."', fechmodif='".$fecha."' WHERE cveissemym='".$cveissemym."';";
                $statement = $this->db->prepare($consulta);
                $statement->execute();
                $result = $statement->fetchAll();
                $resultUpdate["resultado"] = "Actualizado";
            } catch (\Throwable $th) {
                echo $th;
                $resultUpdate["resultado"] = "Error";
            }
            return $resultUpdate;
        }

    }

?>