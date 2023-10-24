<?php

    class homeController{
        private $MODEL;

        public function __construct()
        {
            require_once("/var/www/html/cap1215/model/homeModel.php");
            $this->MODEL = new homeModel();
        }

        public function limpiarusuario($campo){
            $campo = strip_tags($campo);
            $campo = filter_var($campo, FILTER_SANITIZE_EMAIL);
            $campo = htmlspecialchars($campo);
            return $campo;
        }

        public function limpiarcadena($campo){
            $campo = strip_tags($campo);
            $campo = filter_var($campo, FILTER_UNSAFE_RAW);
            $campo = htmlspecialchars($campo);
            return $campo;
        }

        public function verificarusuario($usuario,$contraseña){
            $keydb = $this->MODEL->obtenerclave($usuario);
            if($contraseña==$keydb){
                return(true);
            }else{
                return(false);
            }
        }
    }

?>