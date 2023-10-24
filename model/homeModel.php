<?php
    class homeModel{
        private $PDO;
        
        public function __construct()
        {
            require_once("/var/www/html/cap1215/config/db.php");
            $pdo = new db();
            $this->PDO = $pdo->conexion();
        }

        public function obtenerclave($usuario){     
            try {
                $statement = $this->PDO->prepare('SELECT password FROM usuarios WHERE usuario = :usuario');
                $statement->bindParam(":usuario",$usuario);
                return($statement->execute()) ? $statement->fetch(PDO::FETCH_ASSOC)['password'] : false;
            } catch (\Throwable $th) {
                echo $th;
            }
            
        }
            
    }

?>