(function(){var ss={};if(typeof module!=='undefined'){exports=module.exports=ss;}else{this.ss=ss;}
ss.linear_regression=function(){var linreg={},data=[];linreg.data=function(x){if(!arguments.length)return data;data=x.slice();return linreg;};linreg.line=function(){if(data.length==1){m=0;b=data[0][1];}else{var sum_x=0,sum_y=0,sum_xx=0,sum_xy=0,m,b;for(var i=0;i<data.length;i++){sum_x+=data[i][0];sum_y+=data[i][1];sum_xx+=data[i][0]*data[i][0];sum_xy+=data[i][0]*data[i][1];}
m=((data.length*sum_xy)-(sum_x*sum_y))/
((data.length*sum_xx)-(sum_x*sum_x));b=(sum_y/data.length)-((m*sum_x)/ data.length);
}
return function(x){return b+(m*x);};};return linreg;};ss.r_squared=function(data,f){if(data.length<2)return 1;var sum=0,average;for(var i=0;i<data.length;i++){sum+=data[i][1];}
average=sum/data.length;var sum_of_squares=0;for(var j=0;j<data.length;j++){sum_of_squares+=Math.pow(average- data[j][1],2);}
var err=0;for(var k=0;k<data.length;k++){err+=Math.pow(data[k][1]- f(data[k][0]),2);}
return 1-(err/sum_of_squares);};ss.bayesian=function(){var bayes_model={},total_count=0,data={};bayes_model.train=function(item,category){if(!data[category])data[category]={};for(var k in item){var v=item[k];if(data[category][k]===undefined)data[category][k]={};if(data[category][k][v]===undefined)data[category][k][v]=0;data[category][k][item[k]]++;}
total_count++;};bayes_model.score=function(item){var odds={},category;for(var k in item){var v=item[k];for(category in data){if(odds[category]===undefined)odds[category]={};if(data[category][k]){odds[category][k+'_'+ v]=(data[category][k][v]||0)/ total_count;
}else{odds[category][k+'_'+ v]=0;}}}
var odds_sums={};for(category in odds){for(var combination in odds[category]){if(odds_sums[category]===undefined)odds_sums[category]=0;odds_sums[category]+=odds[category][combination];}}
return odds_sums;};return bayes_model;};ss.sum=function(x){var sum=0;for(var i=0;i<x.length;i++){sum+=x[i];}
return sum;};ss.mean=function(x){if(x.length===0)return null;return ss.sum(x)/ x.length;
};ss.geometric_mean=function(x){if(x.length===0)return null;var value=1;for(var i=0;i<x.length;i++){if(x[i]<=0)return null;value*=x[i];}
return Math.pow(value,1/x.length);};ss.average=ss.mean;ss.min=function(x){var min;for(var i=0;i<x.length;i++){if(x[i]<min||min===undefined)min=x[i];}
return min;};ss.max=function(x){var max;for(var i=0;i<x.length;i++){if(x[i]>max||max===undefined)max=x[i];}
return max;};ss.variance=function(x){if(x.length===0)return null;var mean=ss.mean(x),deviations=[];for(var i=0;i<x.length;i++){deviations.push(Math.pow(x[i]- mean,2));}
return ss.mean(deviations);};ss.standard_deviation=function(x){if(x.length===0)return null;return Math.sqrt(ss.variance(x));};ss.sum_squared_deviations=function(x){if(x.length<=1)return null;var mean=ss.mean(x),sum=0;for(var i=0;i<x.length;i++){sum+=Math.pow(x[i]- mean,2);}
return sum;};ss.sample_variance=function(x){var sum_squared_deviations=ss.sum_squared_deviations(x);if(sum_squared_deviations===null)return null;return sum_squared_deviations/(x.length- 1);};ss.sample_standard_deviation=function(x){if(x.length<=1)return null;return Math.sqrt(ss.sample_variance(x));};ss.sample_covariance=function(x,y){if(x.length<=1||x.length!=y.length){return null;}
var xmean=ss.mean(x),ymean=ss.mean(y),sum=0;for(var i=0;i<x.length;i++){sum+=(x[i]- xmean)*(y[i]- ymean);}
return sum/(x.length- 1);};ss.sample_correlation=function(x,y){var cov=ss.sample_covariance(x,y),xstd=ss.sample_standard_deviation(x),ystd=ss.sample_standard_deviation(y);if(cov===null||xstd===null||ystd===null){return null;}
return cov/xstd/ystd;};ss.median=function(x){if(x.length===0)return null;var sorted=x.slice().sort(function(a,b){return a- b;});if(sorted.length%2===1){return sorted[(sorted.length- 1)/ 2];
}else{var a=sorted[(sorted.length/2)- 1];var b=sorted[(sorted.length/2)];return(a+ b)/ 2;
}};ss.mode=function(x){if(x.length===0)return null;else if(x.length===1)return x[0];var sorted=x.slice().sort(function(a,b){return a- b;});var last=sorted[0],mode,max_seen=0,seen_this=1;for(var i=1;i<sorted.length+ 1;i++){if(sorted[i]!==last){if(seen_this>max_seen){max_seen=seen_this;seen_this=1;mode=last;}
last=sorted[i];}else{seen_this++;}}
return mode;};ss.t_test=function(sample,x){var sample_mean=ss.mean(sample);var sd=ss.standard_deviation(sample);var rootN=Math.sqrt(sample.length);return(sample_mean- x)/ (sd / rootN);
};ss.quantile=function(sample,p){if(sample.length===0)return null;if(p>=1||p<=0)return null;var sorted=sample.slice().sort(function(a,b){return a- b;});var idx=(sorted.length)*p;if(idx%1!==0){return sorted[Math.ceil(idx)- 1];}else if(sample.length%2===0){return(sorted[idx- 1]+ sorted[idx])/ 2;
}else{return sorted[idx];}};ss.jenksMatrices=function(data,n_classes){var lower_class_limits=[],variance_combinations=[],i,j,variance=0;for(i=0;i<data.length+ 1;i++){var tmp1=[],tmp2=[];for(j=0;j<n_classes+ 1;j++){tmp1.push(0);tmp2.push(0);}
lower_class_limits.push(tmp1);variance_combinations.push(tmp2);}
for(i=1;i<n_classes+ 1;i++){lower_class_limits[1][i]=1;variance_combinations[1][i]=0;for(j=2;j<data.length+ 1;j++){variance_combinations[j][i]=Infinity;}}
for(var l=2;l<data.length+ 1;l++){var sum=0,sum_squares=0,w=0,i4=0;for(var m=1;m<l+ 1;m++){var lower_class_limit=l- m+ 1,val=data[lower_class_limit- 1];w++;sum+=val;sum_squares+=val*val;variance=sum_squares-(sum*sum)/ w;
i4=lower_class_limit- 1;if(i4!==0){for(j=2;j<n_classes+ 1;j++){if(variance_combinations[l][j]>=(variance+ variance_combinations[i4][j- 1])){lower_class_limits[l][j]=lower_class_limit;variance_combinations[l][j]=variance+
variance_combinations[i4][j- 1];}}}}
lower_class_limits[l][1]=1;variance_combinations[l][1]=variance;}
return{lower_class_limits:lower_class_limits,variance_combinations:variance_combinations};};ss.jenks=function(data,n_classes){data=data.slice().sort(function(a,b){return a- b;});var matrices=ss.jenksMatrices(data,n_classes),lower_class_limits=matrices.lower_class_limits,k=data.length- 1,kclass=[],countNum=n_classes;kclass[n_classes]=data[data.length- 1];kclass[0]=data[0];while(countNum>1){kclass[countNum- 1]=data[lower_class_limits[k][countNum]- 2];k=lower_class_limits[k][countNum]- 1;countNum--;}
return kclass;};ss.mixin=function(){var support=!!(Object.defineProperty&&Object.defineProperties);if(!support)throw new Error('without defineProperty, simple-statistics cannot be mixed in');var arrayMethods=['median','standard_deviation','sum','mean','min','max','quantile','geometric_mean'];function wrap(method){return function(){var args=Array.prototype.slice.apply(arguments);args.unshift(this);return ss[method].apply(ss,args);};}
for(var i=0;i<arrayMethods.length;i++){Object.defineProperty(Array.prototype,arrayMethods[i],{value:wrap(arrayMethods[i]),configurable:true,enumerable:false,writable:true});}};})(this);