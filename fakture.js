(function($){
    var Model = Backbone.Model.extend({
        defaults:{
            rb:'',
            sifra:'',
            vrstaDobra:'',
            jm:'',
            kol:'',
            cena:'',
            rab:'',
            poreskaOsnovica:'',
            pdv:'',
            ukupanIznos:''
        }
        
    });
    
         // /////        collection    //////////////
         
    var Collection = Backbone.Collection.extend({
       model:Model
    });
     
    var collection = new Collection(); 
    
    ///////////////     view MODEL    ///////////////////////
    
    var ViewModel = Backbone.View.extend({
        tagName:'tr',
        collection:collection,
        render:function(){
            this.$el.html(_.map([this.model.get('rb'),this.model.get('sifra'),this.model.get('vrstaDobra'),
                            this.model.get('jm'),this.model.get('kol'),this.model.get('cena'),
                            this.model.get('rab'),this.model.get('poreskaOsnovica'),this.model.get('pdv'),
                            this.model.get('ukupanIznos')],function(val,key){
                return '<td>'+val+'</td>'
            }));
            return this
        }
    });
    
 
    ///////// /////////       view collection    /////////////////   
    
    var ViewCollection = Backbone.View.extend({
       tagName:'table border="1"',
       initialize:function(){
           var self = this;
          collection.on('add',function(){
             self.render();
          })
       },
         events:{
            'keypress':'setFocus'
        },
        
       render:function(){
           var self = this;
           $(this.el).empty();
           
           this.$el.append('<th>rb</th>','<th>sifra</th>','<th>vr.dobra</th>','<th>jm</th>','<th>kol</th>','<th>cena</th>','<th>rab%</th>','<th>por.osnovica</th>','<th>pdv%</th>','<th>uk.iznos</th>')
           
         _.each(collection.models,function(model,index){
            var y = new ViewModel({model:model});
            y.render();
            self.$el.append(y.el);
          })
    
          this.$el.append('<tr><td><input type="text" class="one" value = "1" disabled></td>,<td><input type="text" class="two"></td>,<td><input type="text" class="three"></td>,<td><input type="text" class="foure"></td>,<td><input type="text" class="five"></td>,<td><input type="text" class="six"></td>,<td><input type="text" class="seven" value="0"></td>,<td><input type="text" class="eight"></td>,<td><input type="text" class="nine" value="20"></td>,<td><input type="text" class="ten"></td></tr>'); 
       },
        map:{
            
            two:{next:'three'},
            three:{next:'foure'},
            foure:{next:'five'},
            five:{next:'six'},
            six:{next:'seven'},
            seven:{next:'nine'},
            nine:{next:'undefined'}
                       
        },
  
        
        ordinalNumber:function(){
             return collection.length + 1;
           
        },
        
        dataModel:{
            two:'sifra',
            three:'vrstaDobra',
            foure:'jm',
            five:'kol',
            six:'cena',
            seven:'rab',
            eight:'poreskaOsnovica',
            nine:'pdv',
            ten:'ukupanIznos'
        },
        
         model:new Model(),
       
        setFocus:function(e){
            if(e.keyCode === 13){
                
                var y = $(e.target).attr('class');
                var set = this.map[y].next;
                var w = this.dataModel[y];
                var sett = $('.'+y).val();
                this.model.set(w,sett);
                this.model.set('rb',this.ordinalNumber());
                
                if(set === 'nine'){
                    this.porOsnovica();
                }
               
                
                
                if(set === 'undefined'){
                    this.ukIznos();
                    collection.push(this.model);
                    this.model = new Model();
                    this.resetInput();
                    $('.two').focus();
                    $('.one').val(this.ordinalNumber());
                }else{
                $('.'+set).focus();
                }
                
                 
            }
           
        },
        
        porOsnovica:function(){
            var po = parseInt($('.five').val());
            var sec = parseInt($('.six').val());
            var th = parseInt($('.seven').val());
            var t = po*sec*th/100;
                t =  po * sec - t;
            $('.eight').val(t);    
            this.model.set('poreskaOsnovica',t);
        },
        
        ukIznos:function(){
           var x = parseInt($('.eight').val());
           var y = parseInt($('.nine').val());
               y = x*y/100;
               y = x+y;               
           this.model.set('ukupanIznos',y);
        },
        
          resetInput:function(){
            $('.one').val('');
            $('.two').val('');
            $('.three').val('');
            $('.foure').val('');
            $('.five').val('');
            $('.six').val('');
            $('.seven').val('');
            $('.eight').val('');
            $('.nine').val('');
            $('.ten').val('');
        }
       
       
       
   });
    
    $(document).ready(function(){
        var model = new Model();
       
       
        var viewCollection = new ViewCollection({collection:collection});
        viewCollection.render();
      
       
        $('body').append(viewCollection.el);
        
       
        
    })
    
})(jQuery)