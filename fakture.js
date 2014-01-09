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
         validation_help:{
            two:'',
            three:'',
            foure:'',
            five:'',
            six:'',
            seven:'',
            eight:'',
            nine:'',
            ten:''
        },
        res_validation_help:function(){
            return{
                two:'',
                three:'',
                foure:'',
                five:'',
                six:'',
                seven:'',
                eight:'',
                nine:'',
                ten:''
               }
        },
        validate:function(attrs){
           if(attrs.sifra === ''){
               this.flag = true;
               return 'You must fill the field';    
           }
          else if(attrs.vrstaDobra === '' && this.validation_help.three === true){
               this.flag = true;
               return 'You must fill the field';
           }
           else if(isNaN(attrs.vrstaDobra) ){
               this.flag = true;
               return 'You must put numerican value'
           }
           else if(attrs.jm === '' && this.validation_help.foure === true ){
               this.flag = true;
               return 'You must fill the field';
           }
           else if(attrs.kol === '' && this.validation_help.five === true ){
               this.flag = true;
               return 'You must fill the field';
           }
           else if(isNaN(attrs.kol) ){
               this.flag = true;
               return 'You must put numerican value'
           }
           else if(attrs.cena === '' && this.validation_help.six === true ){
               this.flag = true;
               return 'You must fill the field';
           }
           else if(isNaN(attrs.cena) ){
               this.flag = true;
               return 'You must put numerican value'
           }
           else if(attrs.rab === '' && this.validation_help.seven === true ){
               this.flag = true;
               return 'You must fill the field';
           }
           else if(isNaN(attrs.rab) ){
               this.flag = true;
               return 'You must put numerican value'
           }
           else if(attrs.pdv === '' && this.validation_help.nine === true ){
               this.flag = true;
               return 'You must fill the field';
           }
           else if(isNaN(attrs.pdv) ){
               this.flag = true;
               return 'You must put numerican value'
           }
           
        },
       
        initialize:function(){
            this.on('invalid',function(model,error){
                alert(error);
            })
        },
        ukIznos:function(){
           var x = parseFloat($('.eight').val()),
               y = parseFloat($('.nine').val()),
               z = x*y/100,
               q = x+z;
               q = q.toFixed(2);
               q = parseFloat(q);
           this.set('ukupanIznos',q); 
        },
         ordinalNumber:function(){
             return collection.length + 1;
        },
          porOsnovica:function(){
            var po = parseFloat($('.five').val()),
               sec = parseFloat($('.six').val()),
                th = parseFloat($('.seven').val());
                 t = po*sec*th/100;
                 t =  po * sec - t;
                 t = t.toFixed(2);
                 t = parseFloat(t);
            $('.eight').val(t);    
            this.set('poreskaOsnovica',t);
        },
        
        flag:'',
        
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
                            this.model.get('ukupanIznos'),'<span class="glyphicon glyphicon-remove remove" data-number='+this.model.get('rb')+'></span>'],function(val,key){
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
            'keypress input':'setFocus',
            'click .remove':'remove_row'
        },
       render:function(){
           var self = this;
           $(this.el).empty();
           this.$el.append('<th>rb</th>','<th>sifra</th>','<th>vr.dobra</th>','<th>jm</th>','<th>kol</th>','<th>cena</th>','<th>rab%</th>','<th>por.osnovica</th>','<th>pdv%</th>','<th>uk.iznos</th>','<th>Brisanje</th>')
           
         _.each(collection.models,function(model,index){
            var y = new ViewModel({model:model});
            y.render();
            self.$el.append(y.el);
          })
    
          this.$el.append('<tr><td><input type="text" class="one" value = "1" disabled></td>,<td><input type="text" class="two"></td>,<td><input type="text" class="three"></td>,<td><input type="text" class="foure" value=""></td>,<td><input type="text" class="five"></td>,<td><input type="text" class="six"></td>,<td><input type="text" class="seven"></td>,<td><input type="text" class="eight"></td>,<td><input type="text" class="nine"></td>,<td><input type="text" class="ten"></td><td><input type="text"></td></tr>'); 
          
          return this
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
        remove_row:function(e){
         var t = $(e.target).attr('data-number');
             t = t - 1;
             t = this.collection.at(t);
             this.collection.remove(t);
             for(i=0;i<this.collection.length;i++){
                this.collection.at(i).set('rb',i+1); 
             }
             this.render();
             $('.one').val(this.model.ordinalNumber());     
        },
        setFocus:function(e){
            if(e.keyCode === 13){
                var y = $(e.target).attr('class'), // uzima nazziv klase za sadasnje polje
                    set_next = this.map[y].next,// uzima naziv za sledece polje
                    w = this.model.dataModel[y],  // uzima naziv koji treba da se setuje u model
                    sett = $('.'+y).val();   // uzima vrednost input polja
                this.model.flag = false;
                this.model.set(w,sett,{validate:true});
                this.model.set('rb',this.model.ordinalNumber());
                if(set_next === 'nine' && sett != ''){
                    this.model.porOsnovica();
                }              
                if(set_next === 'undefined' && this.model.get('pdv') != ''){
                    this.model.ukIznos();
                    collection.add(this.model);
                    this.model = new Model();
                    this.model.validation_help = this.model.res_validation_help();
                    this.resetInput();
                    $('.two').focus();
                    $('.one').val(this.model.ordinalNumber());
                } 
                if(this.model.flag === true){
                    $('.'+y).val('').focus();      
                }
                else{      
                    $('.'+set_next).focus();
                    this.model.validation_help[set_next]= true; 
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
   
   var View_All = Backbone.View.extend({
       tagName:'table border="1"',
       className:'all',
       initialize:function(){
         var self = this;
         this.render();
         this.collection.on('add',function(){
             self.set_finaly();
         })
       },
       render:function(){
         $(this.el).empty();
         var html = '<tr><th>por.osnovica</th><><th>Uk.pdv</th><th>Ukupno</th></tr><tr><td class="por_osn">0</td><td class="pdv_uk">0</td><td class="sum">0</td></tr>';
         this.$el.append(html);
       }, 
       set_finaly:function(){
            var x = 0,
                z = 0,    
                y = 0;
            for(i=0;i<collection.length;i++){
              
             x = x + this.collection.at(i).get('poreskaOsnovica');
             y = y + this.collection.at(i).get('ukupanIznos');
             z = y - x;
           }
            z = z.toFixed(2);
            x = x.toFixed(2);
            y = y.toFixed(2);
            z = parseFloat(z);
            $('.por_osn').html(x);
            $('.sum').html(y);
            $('.pdv_uk').html(z)
       }
   })
   
   var HeaderView = Backbone.View.extend({
       el:'.data_all',
       events:{
          'dblclick .first':'set_data',
          'blur input':'save_data',
          'keypress':'close_input'
       },
       set_data:function(e){
         var e = $(e.target);
             e.attr('class','blank');
            var red = e.next().removeAttr('class');
            $('.data_all').find('input').focus();
       },
       save_data:function(e){
           var e = $(e.target),
               prev = e.parent().prev();
               prev.html(e.val());
               prev.removeAttr('class');
               e.parent().prev().attr('class','first');
               e.parent().attr('class','blank');          
       },
       close_input:function(e){
           this.save_data(e);
       }
   })
   
    
    $(document).ready(function(){
        var model = new Model();
  
        var viewCollection = new ViewCollection({collection:collection,model:model});
        viewCollection.render();
        
        var headerView = new HeaderView();
       
        
        var view_all = new View_All({collection:collection});
        
        
        $('.container').append(viewCollection.el);
        $('.container').append(view_all.el);
        
        
        
    })
    
})(jQuery)