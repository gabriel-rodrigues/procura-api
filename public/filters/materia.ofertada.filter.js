(function () {



    function MateriaOfertadaFilter() {

       return function (valores, termoPesquisa) {

           var valoresFiltrados = termoPesquisa ? [] : valores;


           if(termoPesquisa) {
               angular.forEach(valores, function (valor) {

                   if (valor.materia.nome.toLowerCase(). indexOf(termoPesquisa.toLowerCase()) !== -1) {
                       valoresFiltrados.push(valor);
                   }

               });
           }


           return valoresFiltrados;
       };

    }

    angular.module('procuraAlerta.filters')
        .filter('MateriaOfertadaFilter', [MateriaOfertadaFilter]);

})();