const dataSAmple = [
    {
        id:1, //should be increased with +1 according to the last record
        type:"heat",
        heat_series: 1 ,//should automatically caluclate according to last added record where type === heat,
        total_duration: 1, // sum of total duration in time_segments array (//in seconds)
        launched:false, //by default false
       
        time_segments:[
            {
                 id:1,
                 duration:32, //in seconds
                 play_sequence:"up/down",
                 preload:false, //true or false
                 sounds:[
                    {
                    cue_at:23,//in secdonds
                    audio:"audio file" 

                    }// }
                 ]
                },
                {
                    
                        id:1,
                        duration:32, //in seconds
                        play_sequence:"up/down",
                        preload:false, //true or false
                        sounds:[
                           {
                           cue_at:23,//in secdonds
                           audio:"audio file" 
       
                           }// }
                        ]
                       
                }
        ],
        lanes:[
          /////
           ],

    }
]

const datatransition = [
    {        id:1, //should be increased with +1 according to the last record id
        type:"transition",
        transition_series: 1 ,//should automatically caluclate according to last added record where type === transition,
        launched:false, //by default false
        total_duration:"",/// sum of all durations in time_segment
       
        time_segments:[
            {
                video_file: "file",//
                cue_at:"s",
                duration:""
            }
        ]
    }
]
export {dataSAmple}