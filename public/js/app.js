angular.module('cultstage',['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$tu="templates/";
	$routeProvider
	.when("/", { templateUrl:$tu+'home.html' })
	.when("/home", { templateUrl:$tu+'home/index.html'})
	.when("/dashboard", { templateUrl:$tu+'dashboard/index.html'})
	
	.when("/message", { redirectTo:"/message/all"})
	.when("/message/compose", { templateUrl:$tu+'message/compose.html'})
	.when("/message/all", { templateUrl:$tu+'message/all.html'})
	.when("/message/unread", { templateUrl:$tu+'message/unread.html'})
	.when("/message/sent", { templateUrl:$tu+'message/sent.html'})
	
	.when("/jobs", { redirectTo:'/jobs/my-applications'})
	.when("/jobs/my-applications", { templateUrl:$tu+'jobs/applications.html'})
	.when("/jobs/my-job-postings", { templateUrl:$tu+'jobs/my-job-postings.html'})
	.when("/jobs/new-job", { templateUrl:$tu+'jobs/new-job.html'})
	.when("/jobs/my-projects", { templateUrl:$tu+'jobs/my-projects.html'})
	
	.when("/people", { redirectTo:"/people/connected" })
	.when("/people/connected", { templateUrl:$tu+'people/index.html'})
	
	.when("/events", { redirectTo:"/events/interested"})
	.when("/events/interested", { templateUrl:$tu+'events/index.html'})
	.when("/events/post-new", { templateUrl:$tu+'events/post-new.html'})

	.when("/profile", { redirectTo:"/profile/about"})
	.when("/profile/about", { templateUrl:$tu+'profile/about.html'})
	.when("/profile/posts", { templateUrl:$tu+'profile/posts.html'})
	.when("/profile/photos", { templateUrl:$tu+'profile/photos.html'})
	.when("/profile/videos", { templateUrl:$tu+'profile/videos.html'})
	.when("/profile/audios", { templateUrl:$tu+'profile/audios.html'})
	.when("/profile/script-works", { templateUrl:$tu+'profile/script-works.html'})
	
	.when("/event/:uuid",{ templateUrl:$tu+'events/eventview.html'})
	/*.when('/home/project/:uuid',{ templateUrl:$tu+'/project/index.html' })
	.when('/profile/:uuid',{ templateUrl:$tu+'/profile/index.html'})
	.when('/message/',{ templateUrl:$tu+'/message/index.html' })
	.when('/people/',{ templateUrl:$tu+'/people/index.html' })
	*//*.otherwise({
		redirectTo:"/"
	})*/
	;
}])

.run(function($rootScope, $location){
	/*ROUTE HANDLERS*/
	$rootScope.activeM=-1;
	$rootScope.activeSM=-1;

	$rootScope.routes=['/home/',"/home","/people","/events","/jobs","/message","/profile"];	
	$rootScope.subRoutes=[
					["jobs/my-applications","events/interested","/message/compose","/people/connected","/profile/about"],
					["events/post-new","/jobs/my-job-postings","/message/all",,"/profile/posts"],
					["/jobs/new-job","/message/unread",,"/profile/photo"],
					["/jobs/my-projects","/message/sent",,"/profile/video"],
					["/profile/audio"],
					["/profile/script-works"]
					];
	
	$rootScope.findSubRoute=function(){
    	var found=false;
		for (var i = $rootScope.subRoutes.length - 1; i >= 0; i--) {
			for (var j = $rootScope.subRoutes[i].length - 1; j >= 0; j--) {
				if($location.path().indexOf($rootScope.subRoutes[i][j])>-1){
					$rootScope.SM=i;
					console.log(i);
					var found=true;	
					break;	
				}
			}
			if(found){break;}
		};
	}


	$rootScope.$on('$locationChangeSuccess', function(event){
        var url = $location.url()/*,
        params = $location.search()*/;
        if(url=="/"){
        	$rootScope.islanding=true;
        }
        else{
        	$rootScope.islanding=false;
        	
        	for(var r=0 ;r<$rootScope.routes.length;r++){
        		if($location.path().indexOf($rootScope.routes[r])>-1){
        			$rootScope.activeM=r; 
        			$rootScope.findSubRoute();
        			break;
        		}
        		else{
        			if(r==$rootScope.routes.length-1) $rootScope.activeM=-1;
        		}
        	}
        }

        

	});

	/*OTHER PARAMS*/
	$rootScope.sign=0;//0 or 1: sign up or sign in


})

;