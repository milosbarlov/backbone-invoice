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
        },
        
        validate:function(attrs){
           if(attrs.sifra === ''){
               this.flag = true;
               return '1111111';
               
           }else if(attrs.vrstaDobra === ''){
               this.flag = false;
               return '22222';
           }
        },
       
        initialize:function(){
            this.on('invalid',function(model,error){
                alert(error);
            })
        },
           ukIznos:function(){
           var x = parseInt($('.eight').val()),
               y = parseInt($('.nine').val());
               y = x*y/100;
               y = x+y;               
           this.set('ukupanIznos',y);
        },
          ordinalNumber:function(){
             return collection.length + 1;
           
        },
          porOsnovica:function(){
            var po = parseInt($('.five').val()),
               sec = parseInt($('.six').val()),
                th = parseInt($('.seven').val());
                 t = po*sec*th/100;
                t =  po * sec - t;
            $('.eight').val(t);    
            this.set('poreskaOsnovica',t);
        },
        
        flag:''
         
        
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
           this.collection.on('add',function(){
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
    
          this.$el.append('<tr><td><input type="text" class="one" value = "1" disabled></td>,<td><input type="text" class="two"></td>,<td><input type="text" class="three"></td>,<td><input type="text" class="foure" value="kom"></td>,<td><input type="text" class="five"></td>,<td><input type="text" class="six"></td>,<td><input type="text" class="seven" value="0"></td>,<td><input type="text" class="eight"></td>,<td><input type="text" class="nine" value="20"></td>,<td><input type="text" class="ten"></td></tr>'); 
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
      
       
        setFocus:function(e){
            if(e.keyCode === 13){
                var y = $(e.target).attr('class'); // uzima nazziv klase za sadasnje polje
                  var set_next = this.map[y].next;// uzima naziv za sledece polje
                  var w =this.dataModel[y];  // uzima naziv koji treba da se setuje u model
                 var sett = $('.'+y).val();   // uzima vrednost input polja
                this.model.flag = false;
                this.model.set(w,sett,{validate:true});
                this.model.set('rb',this.model.ordinalNumber());
               
               
                
                if(set_next === 'nine'){
                    this.model.porOsnovica();
                }
               
                
                
                if(set_next === 'undefined'){
                    this.model.ukIznos();
                    collection.add(this.model);
                    this.model = new Model();
                    this.resetInput();
                    $('.two').focus();
                    $('.one').val(this.model.ordinalNumber());
                }
                
                if(this.model.flag === true){
                    $('.'+y).val('').focus();
                }
                else{
                    
                    $('.'+set_next).focus();
                };
                
                 
            }
           
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
       
       
        var viewCollection = new ViewCollection({collection:collection,model:model});
        viewCollection.render();
      
       
        $('body').append(viewCollection.el);
        
    
        
    })
    
})(jQuery)