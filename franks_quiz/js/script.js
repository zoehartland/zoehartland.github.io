//namespace any global variables
var dvc = {}; 


d3.select(".start").on("click",function(){		
		$("#landing").hide();
		$("#question1").show();
});

d3.select(".q1a1").on("click",function(){	
		d3.selectAll(".q1").classed("active" ,false);
		d3.select(this).classed("active" ,true);	
		$("#q1answer2").hide();
		$("#q1answer3").hide();
		$("#q1answer4").hide();
		$("#q1answer1").show();
});
d3.select(".q1a2").on("click",function(){	
		d3.selectAll(".q1").classed("active" ,false);
		d3.select(this).classed("active" ,true);	
		$("#q1answer1").hide();
		$("#q1answer3").hide();
		$("#q1answer4").hide();
		$("#q1answer2").show();
});
d3.select(".q1a3").on("click",function(){	
		d3.selectAll(".q1").classed("active" ,false);
		d3.select(this).classed("active" ,true);	
		$("#q1answer1").hide();
		$("#q1answer2").hide();
		$("#q1answer4").hide();
		$("#q1answer3").show();
});
d3.select(".q1a4").on("click",function(){	
		d3.selectAll(".q1").classed("active" ,false);
		d3.select(this).classed("active" ,true);	
		$("#q1answer1").hide();
		$("#q1answer2").hide();
		$("#q1answer3").hide();
		$("#q1answer4").show();
});
		
				d3.select(".goto2").on("click",function(){		
						$("#question1").hide();
						$("#question2").show();
				});

d3.select(".q2a1").on("click",function(){	
		d3.selectAll(".q2").classed("active" ,false);
		d3.select(this).classed("active" ,true);	
		$("#q2answer2").hide();
		$("#q2answer3").hide();
		$("#q2answer4").hide();
		$("#q2answer1").show();
});
d3.select(".q2a2").on("click",function(){	
		d3.selectAll(".q2").classed("active" ,false);
		d3.select(this).classed("active" ,true);	
		$("#q2answer1").hide();
		$("#q2answer3").hide();
		$("#q2answer4").hide();
		$("#q2answer2").show();
});
d3.select(".q2a3").on("click",function(){	
		d3.selectAll(".q2").classed("active" ,false);
		d3.select(this).classed("active" ,true);	
		$("#q2answer1").hide();
		$("#q2answer2").hide();
		$("#q2answer4").hide();
		$("#q2answer3").show();
});
d3.select(".q2a4").on("click",function(){	
		d3.selectAll(".q2").classed("active" ,false);
		d3.select(this).classed("active" ,true);	
		$("#q2answer1").hide();
		$("#q2answer2").hide();
		$("#q2answer3").hide();
		$("#q2answer4").show();
});
		
				d3.select(".goto3").on("click",function(){		
						$("#question2").hide();
						if (pymChild) {
							pymChild.sendHeight();
						}
						
						d3.select("#question3").style( "visibility","visible")
				});
				


	pymChild = new pym.Child();
	//remove preview image/message if browser suppports SVG
	$("#altern").remove();

	//Load main script/data
	$(document).ready(function()
	{	
		

	
	width = $(".container-fluid").width();
	
		//main script
		Totalspent = 13679;
		
		ActualSplit = [5411,1426,3434,3408];
		
		classes = ["first","second","third","fourth"];
		
//Pensions	83,527	87,306	93,699	100,939	104,442	41.6
//Incapacity, disability and injury benefits	30,626	32,372	33,916	36,416	37,537	14.9
//Unemployment benefits	5,533	5,231	5,633	5,939	4,945	2.0
//Housing benefits	22,812	24,399	25,366	26,360	26,386	10.5
//family benefits, income support and tax credits	21,943	21,282	20,308	18,484	16,134	6.4
//Personal social services and other benefits	58,560	59,807	61,075	62,336	61,828	24.6
		
		$("#revealslide").hide();
		$(".textResult").hide();
		
		categories = ["Detached","Semi-detached","Terraced","Flats/Maisonettes"];
		
		$.fn.digits = function(){ 
			return this.each(function(){ 
				$(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
			})
		}
		
		$("#submitbutton").click(revealresult);
		
		for(i = 0; i < classes.length; i++) {
			
			var percentshare =  Math.round((ActualSplit[i] / Totalspent)*100);
			var startshare = Math.round(Totalspent/classes.length);
			var startshareper = Math.round(100/classes.length);
				
			$("#revealrow").append('<td class="' + classes[i] + '" width=' + percentshare + '%</td>');
			$("#textrev" + i).append("<span>" + ActualSplit[i].toLocaleString("en") + "</span><br>" + percentshare + "%");
			$("#initialrow").append('<td class="' + classes[i] + '" width=' + startshare + '%</td>');
			$("#textnx" + i).append("<span>" + startshare.toLocaleString("en") + "</span><br>" + Math.round(startshareper) + "%");

		};
		
		
	function revealresult() {
		$("#revealslide").show();
		$(".textResult").show();
		$("#submitbutton").addClass("hidden");
		$('#slider').attr("disabled",'disabled');
		$('#slider').css("pointer-events","none");
		$(".JCLRgrip").addClass("hidden");
			if (pymChild) {
		        pymChild.sendHeight();
		    }

	}

	$(function(){	

		//callback function
		var onSlide = function(e){
			var columns = $(e.currentTarget).find("td");
			
			var ranges = [], total = 0, i, s ="Ranges: ", w;
			for(i = 0; i<columns.length; i++){
				w = columns.eq(i).width()-10 - (i==0?1:0);
				ranges.push(w);
				total+=w;
			}		 
			for(i=0; i<columns.length; i++){	
			
				ranges[i] = 100*(ranges[i]/total);
				carriage = ranges[i]-w
				
				s =Math.round(ranges[i]) + "%";	
				number = Math.round((ranges[i]/100)*Totalspent)
				numberfmt = number.toLocaleString("en");
				
				$("#textnx" + i).html("<span>" + numberfmt + "</span><br>"+ s);
		
			}
			
			if (pymChild) {
		        setTimeout(function(){pymChild.sendHeight()},5000);
		    }		
			//s=s.slice(0,-1);			
		}
		
		//colResize the table
		$("#range").colResizable({
			liveDrag:true, 
			draggingClass:"rangeDrag", 
			gripInnerHtml:"<div class='rangeGrip'></div>", 
			onResize:onSlide,
			minWidth:8
			});
		
			
	});	

			if (pymChild) {
		       pymChild.sendHeight();
		    }	
	}
	) 


				