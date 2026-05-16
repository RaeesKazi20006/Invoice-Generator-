
function addItem(){
  const div = document.createElement("div");
  div.className = "item-row";
  div.innerHTML = `
    <input placeholder="Desc">
    <input type="number" placeholder="Qty">
    <input type="number" placeholder="Price">
  `;
  document.getElementById("items").appendChild(div);
}

addItem();

function generateInvoice(){
  let rows = document.querySelectorAll(".item-row");
  let table = "";
  let total = 0;

  rows.forEach(r=>{
    let i = r.querySelectorAll("input");
    let desc = i[0].value;
    let qty = +i[1].value || 0;
    let price = +i[2].value || 0;
    let amt = qty * price;
    total += amt;

    table += `<tr>
      <td>${qty}</td>
      <td>${desc}</td>
      <td>${price}</td>
      <td>${amt}</td>
    </tr>`;
  });

  document.getElementById("printArea").innerHTML = `
    <h1>INVOICE</h1>
    <p>${company.value}</p>
    <p>${billTo.value}</p>

    <table border="1" width="100%">
      <tr><th>Qty</th><th>Desc</th><th>Price</th><th>Total</th></tr>
      ${table}
    </table>

    <h2>Total: ${total}</h2>
  `;
}

async function saveAsPDF(){
  const el = document.getElementById("printArea");
  el.style.display="block";

  await html2pdf().from(el).save();
  el.style.display="none";
}

async function savePNG(){
  const el = document.getElementById("printArea");
  el.style.display="block";

  const canvas = await html2canvas(el);
  const a = document.createElement("a");
  a.download = "invoice.png";
  a.href = canvas.toDataURL();
  a.click();

  el.style.display="none";
}

function newInvoice(){
  location.reload();
}

function toggleTheme(){
  document.body.classList.toggle("light");
}
