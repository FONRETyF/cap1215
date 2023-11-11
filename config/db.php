<?php
    class db{
        /*private $host="localhost";
        private $dbname="acup";
        private $user="postgres";
        private $password="admin*&";*/
        
        public function conexion(){
            try {
                $PDO = new PDO("pgsql:host=localhost; port=5432; dbname=acup; user=postgres; password='admin*&'");
                //$PDO = new PDO("pgsql:host=fonretyf-db.csqe5ka3i07r.us-east-1.rds.amazonaws.com; port=5432; dbname=acup; user=postgres; password='Fonre.21-24'");
                return $PDO;  
            } catch (PDOException $error) {
                //throw $th;
                die("Error en la conexion, error: ".$error->getMessage());
            }
        }
    }
    
?>
