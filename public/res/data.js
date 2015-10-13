EVENT = [
    'fashion',
    'people',
    'char',
    'war'
];



FASHION = {
    NONE :          {value:0,   name:'none'}
    ,SHOES :        {value:1,   name:'shoes'}
    ,CLOTH:         {value:2,   name:'cloth'}
    ,GLASSES:       {value:3,   name:'glasses'}
    ,HAT :          {value:4,   name:'hat'}
    ,WHITE_BEARD :  {value:5,   name:'white beard'}
    ,BROWN_BEARD :  {value:6,   name:'brown beard'}
    ,BLACK_BEARD :  {value:7,   name:'black beard'}
    ,BOLD :         {value:8,   name:'bold'}
};

WAR = {
    NONE :          {value:0,name:'none'}
    ,HUMAN :        {value:1,name:'human'}
    ,WEAPHON :      {value:2,name:'weaphon'}
    ,FIRE :         {value:3,name:'fire'}
    ,WATER :        {value:4,name:'water'}
    ,MOON :         {value:5,name:'moon'}
    ,SUN :          {value:6,name:'sun'}
};


data = [
    {
        name : '0',
        fashion : FASHION.CLOTH,
        people : 2,
        char : 48,
        war : WAR.HUMAN
    },

    {
        name : '1',
        fashion : FASHION.CLOTH,
        people : 4,
        char : 3,
        war : WAR.WATER
    },

    {
        name : '3',
        fashion : FASHION.CLOTH,
        people : 1,
        char : 29,
        war : WAR.WEAPHON
    },

    {
        name : '4',
        fashion : FASHION.CLOTH,
        people : 2,
        char : 4,
        war : WAR.WATER

    },

    {
        name : '5',
        fashion : FASHION.NONE,
        people : 0,
        char : 45,
        war : WAR.NONE
    },

    {
        name : '6',
        fashion : FASHION.NONE,
        people : 0,
        char : 3,
        war : WAR.FIRE
    },

    {
        name : '7',
        fashion : FASHION.CLOTH,
        people : 1,
        char : 7,
        war : WAR.WATER
    },

    {
        name : '8',
        fashion : FASHION.CLOTH,
        people : 1,
        char : 0,
        war : WAR.WATER
    },

    {
        name : '9',
        fashion : FASHION.CLOTH,
        people : 3,
        char : 9,
        war : WAR.WATER
    },

    {
        name : '10',
        fashion : FASHION.HAT,
        people : 3,
        char : 1,
        war : WAR.FIRE
    }

]
;

