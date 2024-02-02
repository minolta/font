describe("Test short array", () => {
  let array = [
    {
      device: { name: "d1" },
      portname: "P1",
    },
    {
      device: { name: "d5" },
      portname: "P4",
    },
    {
      device: { name: "d2" },
      portname: "P2",
    },
    {
      device: { name: "d5" },
      portname: "P2",
    },
    {
      device: { name: "d3" },
      portname: "P2",
    },
    {
      device: { name: "d5" },
      portname: "p1",
    },
  ];

  it("map array", () => {
    let s = [];

    s = array.map((item) => {
      let o = {
        target: item.device,
      };
      return o;
    });

    expect(s.length).toBeGreaterThan(0);

    expect(s[0].target.name).toEqual("d1");

    s.sort(function (a, b) {
      console.log(a);
      console.log(b);
      var x = a.target.name.toLowerCase();
      var y = b.target.name.toLowerCase();
      if (x < y) return -1;
      if (x > y) return 1;
      return 0;
    });

    expect(s[3].target.name).toEqual("d5");
  });

  it("short by device name", () => {
    let s = array.map((item) => {
      let o = {
        target: item.device,
        portname: item.portname,
      };
      return o;
    });

    s.sort(function (a, b) {
      console.log(a);
      console.log(b);
      var x = a.target.name.toLowerCase();
      var y = b.target.name.toLowerCase();
      var p1 = a.portname.toLocaleLowerCase();
      var p2 = b.portname.toLocaleLowerCase();

      if (x < y) return -1;
      if (x > y) return 1;

      //ถ้า เท่ากันให้เรียง port ด้วย
      //   return 0;
      if (p1 < p2) return -1;
      if (p1 > p2) return 1;

      return 0;
    });

    expect(s[3].target.name).toEqual("d5");
    s.forEach(p);
    console.log(s)
  });
});

function p(item:any) {
  console.log("DATA:============" + JSON.stringify(item));
}
