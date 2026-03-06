fetch("./assets/data/district-master.csv")
  .then((res) => res.text())
  .then((data) => {
    const rows = data.split("\n").slice(1);

    let dataset = rows.map((r) => {
      let cols = r.split(",");
      return { state: cols[1], district: cols[3] };
    });

    const stateDropdown = document.getElementById("state");
    const districtDropdown = document.getElementById("city");

    // Default empty options
    stateDropdown.add(new Option("Select State", ""));
    districtDropdown.add(new Option("Select District", ""));

    const states = [...new Set(dataset.map((d) => d.state))];

    states.forEach((s) => {
      let option = new Option(s, s);
      stateDropdown.add(option);
    });

    stateDropdown.addEventListener("change", function () {
      districtDropdown.innerHTML = "";

      // Reset district dropdown with empty option
      districtDropdown.add(new Option("Select District", ""));

      const filtered = dataset.filter((d) => d.state === this.value);

      filtered.forEach((d) => {
        let option = new Option(d.district, d.district);
        districtDropdown.add(option);
      });
    });
  });