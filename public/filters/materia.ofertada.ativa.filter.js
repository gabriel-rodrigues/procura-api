(function () {



    function MateriaOfertadaAtivaFilter() {


        var existe = function (nomeMateria, ofertas) {
            var resultado = false;

            angular.forEach(ofertas, function (oferta) {
                if(oferta.materia.nome.toLowerCase().trim() === nomeMateria) {
                    resultado = true;
                }
            });

            return resultado;
        };

        return function (materiasOfertarPorCurso, ofertas) {

            var materiasPodemSerUtilizadas = ofertas ? [] : materiasOfertarPorCurso;

            if(ofertas) {


                angular.forEach(materiasOfertarPorCurso, function (materia) {
                    if(!existe(materia.nome.toLowerCase().trim(), ofertas)) {
                        materiasPodemSerUtilizadas.push(materia);
                    }
                });
            }



            return materiasPodemSerUtilizadas;
        };

    }

    angular.module('procuraAlerta.filters')
        .filter('MateriaOfertadaAtivaFilter', [MateriaOfertadaAtivaFilter]);

})();