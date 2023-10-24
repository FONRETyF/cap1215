
<?php

class cantidadLetras{
    public $unidades = ["", "UN", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE", "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE", "VEINTE", "VEINTIUN", "VEINTIDOS", "VEINTITRES", "VEINTICUATRO", "VEINTICINCO", "VEINTISEIS", "VEINTISIETE", "VEINTIOCHO", "VEINTINUEVE"];
    public $decenas = ["", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA", "CIEN"];
    public $centenas = ["", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"];
    
    public $resultado;
    public $conector = "CON";
    public $moneda = "PESO";
    public $monedas = "PESOS";
    public $centimo = "CENTAVO";
    public $centimos = "CENTAVOS";

    public function cantidadLetras($numero){
        if ($numero >= 0 && $numero <= 1999999999.99) {
            $numeroLetra = $this->numeroRecursivo(intval($numero));
            if (($numero) == 1) {
                $numeroLetra = $numeroLetra . " " . $this->moneda;
            } else {
                $numeroLetra = $numeroLetra . " " . $this->monedas;
            }
            
            $numCentimos =  round(($numero - intval($numero)),2) * 100;
            if ($numCentimos < 10) {
                $numeroLetra = $numeroLetra . " 0" . $numCentimos . "/100 M.N.";
            } else {
                $numeroLetra = $numeroLetra . " " . $numCentimos . "/100 M.N.";
            }
            return $numeroLetra;
        } else {
            $numeroLetra ="";
            return $numeroLetra;
        }
    }

    public function numeroRecursivo($numero){
        if ($numero === 0) {
            $resultado = "CERO";
        }elseif($numero > 0 && $numero <= 29) {
            $resultado = $this->unidades[$numero];
        }elseif($numero >= 30 && $numero <= 100) {
            $decena = $this->decenas[intdiv($numero,10)];
            if (($numero % 10) <> 0) {
                $resultado = $decena . " Y " . $this->numeroRecursivo($numero % 10);
            } else {
                $resultado = $decena . "";
            }
        }elseif($numero >= 101 && $numero <= 999) {
            $centena = $this->centenas[intdiv($numero,100)];
            if (($numero % 100) <> 0) {
                $resultado = $centena . " " . $this->numeroRecursivo($numero % 100);
            } else {
                $resultado = $centena . "";
            }
        }elseif ($numero >= 1000 && $numero <= 1999) {
            if (($numero % 1000) <> 0) {
                $resultado = "MIL" . " " . $this->numeroRecursivo($numero % 1000);
            } else {
                $resultado = "MIL" . "";
            }
        }elseif ($numero >= 2000 && $numero <= 999999) {
            $resultado = $this->numeroRecursivo(intdiv($numero,1000)) . " MIL";
            if (($numero % 1000) <> 0) {
                $resultado = $resultado . " " . $this->numeroRecursivo($numero % 1000);
            } else {
                $resultado = $resultado . "";
            }
        }elseif ($numero >= 1000000 && $numero <= 1999999) {
            if (($numero % 1000000) <> 0) {
                $resultado = "UN MILLON" . " " . $this->numeroRecursivo($numero % 1000000);
            } else {
                $resultado = "UN MILLON" . "";
            }
        }elseif ($numero >= 2000000 && $numero <= 1999999999) {
            $resultado = $this->numeroRecursivo(intdiv($numero,1000000)) . " MILLONES";
            if (($numero % 1000000) <> 0) {
                $resultado = $resultado . " " . $this->numeroRecursivo($numero % 1000000);
            } else {
                $resultado = $resultado . "";
            }
        }      
        return $resultado;		
    }
}


?>