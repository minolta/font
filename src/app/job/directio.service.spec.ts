import { TestBed } from "@angular/core/testing";

import { DirectioService } from "./directio.service";

describe("DirectioService", () => {
  let service: DirectioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectioService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Test add port to run ", () => {

    service.add({deviceid:1,portid:2,runtime:1000,nowrun:0})
    service.add({deviceid:2,portid:3,runtime:1000,nowrun:0})
    expect(service.runs.length).toEqual(2)
  });

  it("Test find object",()=>{
    service.add({deviceid:1,portid:2,runtime:1000,nowrun:0})
   
    let found = service.find({deviceid:1,portid:2,runtime:1000,nowrun:0})
    expect(found).toBeTruthy();
  });

  it("Test run obj",()=>{
    service.add({deviceid:1,portid:2,runtime:10,nowrun:0})

    service.updaterun()
    let device = service.getbydeviceid(1)

    expect(device?.nowrun).toEqual(1);
  })

  it("Test run updaterun",()=>{

    service.add({deviceid:1,portid:2,runtime:10,nowrun:0})
    
    for(let i=0;i<10;i++)
    {
        service.updaterun();
    }
    expect(service.runs[0].nowrun).toEqual(10)
  })
  it("Test run into run",()=>{

    service.add({deviceid:1,portid:2,runtime:10,nowrun:0})
    service.add({deviceid:2,portid:2,runtime:20,nowrun:0})
    
    for(let i=0;i<10;i++)
    {
        service.updaterun();
    }
    // service.removeruns();
    service.updatehistory();
    // expect(service.runs[0].nowrun).toEqual(10)
    // expect(service.runs.length).toEqual(1)
  })
  it("Test run into history",()=>{

    service.add({deviceid:1,portid:2,runtime:10,nowrun:0})
    service.add({deviceid:2,portid:2,runtime:20,nowrun:0})
    
    for(let i=0;i<10;i++)
    {
        service.updaterun();
    }
    // service.removeruns();
    service.updatehistory();
    // expect(service.runs[0].nowrun).toEqual(10)
    expect(service.history.length).toEqual(1)
  })
});
