<?php
    class dbfonretyf{
        protected $dbh;

        public function conexfonretyf(){
            try {
                //$conectar = $this->dbh= new PDO("pgsql:host=localhost; port=5432; dbname=fonretyf; user=postgres; password='admin*&'");
                $conectar = $this->dbh= new PDO("pgsql:host=fonretyf-db.csqe5ka3i07r.us-east-1.rds.amazonaws.com; port=5432; dbname=fonretyf; user=postgres; password='Fonre.21-24'");
                return $conectar;  

            } catch (PDOException $error) {
                die("Error en la conexion, error: " . $error -> getMessage());
            }
        }

        public function set_names(){
            return $this->dbh->query("SET NAMES 'utf-8'");
        }
    }
?>
