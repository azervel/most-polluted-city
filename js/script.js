  
       var btn = document.getElementById("btn-search");
       var current = getCurrentDate();
                    console.log("date: " + current);
                    
        function getCurrentDate() {
			var date = new Date();
			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
            var yyyy = date.getFullYear();
         
            
					
			if(dd<10) {
				dd = '0'+dd
			} 
					
			if(mm<10) {
				mm = '0'+mm
			}
            date = yyyy + '-' + mm + '-' + dd;	
            				
            return date;
            
            }   
            
         
                    
       btn.addEventListener("click", function(){
         
        var inputCountry = document.getElementById("input-cities").value;
        var current = getCurrentDate();
        var country;
        if(inputCountry == "Poland"){
            country = "PL";
        }
        else if(inputCountry == "Germany") {
            country = "DE";
        }
        else if(inputCountry == "France") {
            country = "FR";
        }
        else if(inputCountry == "Spain"){
            country = "ES";
        }
        
        var url = "https://api.openaq.org/v1/measurements?limit=10&date_from="+current+"T00:00:00&country="+country+"&order_by=value&sort=desc&order_by=date";
       
        fetch(url)
        .then(resp => resp.json())
        .then(resp => {
            
    
            resp.results.forEach(city => {
                const infoCityUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srnamespace=*&origin=*&srlimit=1&srsearch=${city.city}`;

                document.getElementById('top-cities').innerHTML = "";
                
                fetch(infoCityUrl)
                .then(res => res.json())
                .then(res => {
                    

                    res.query.search.forEach(infoCity => {

                            document.getElementById('top-cities').innerHTML +=  "<button class='accordion'>"+ `${city.city}` + "</button><div class='panel'><h3>"+`${infoCity.title}`+" - "+`${city.value}${city.unit}`+"</h3><p>" + `${infoCity.snippet}` +"</p></div>";
                            console.log(res);
 
                        var acc = document.getElementsByClassName("accordion");
                        var i;

                        for (i = 0; i < acc.length; i++) {
                        acc[i].addEventListener("click", function() {
                            this.classList.toggle("active");
                            var panel = this.nextElementSibling;
                            if (panel.style.maxHeight) {
                            panel.style.maxHeight = null;
                            } else {
                            panel.style.maxHeight = panel.scrollHeight + "px";
                            }
                        });
                        }

                    })
                    
                })

            })
        })

          
       })