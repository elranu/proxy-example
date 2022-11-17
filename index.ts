
interface IOriginal {
    name: string;
    doStuff(more: string) : void;
  }
  
  class Original implements IOriginal {
    constructor(public name: string) {
    }
  
    doStuff(more: string){
      console.log(`${this.name} : ${more} #`);
    } 
  }
  
  
  const handler = {
    
    // apply(target, thisArg, argumentsList) {
    //   console.log(`called: ${argumentsList}  ###`);
    //   return;
    // },
    
    get(target: any, prop: any, receiver: any) {
      if (prop === "name2") return "world";
      
      const value = target[prop];
      if(value instanceof Function) {
         return function (...args:any[]) {
          console.log('a')
          return value.apply(target, args);
        };
      }
  
      if(prop)
      return Reflect.get(target, prop, receiver);
    }
  }
  
  
  const o = new Original("firxxst");
  o.doStuff("coco");
  
  const  proxy = new Proxy<IOriginal>(o, handler);
  console.log(proxy.name);
  proxy.doStuff("Proxy"); 
  