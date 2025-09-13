// Lấy base URL (vd: http://localhost:3000)
const baseURL = window.location.origin;

// Responsive table plugin (nếu có)
if ($("table").length > 0 && $.fn.rtResponsiveTables) {
  $("table").rtResponsiveTables();
}

// ============ ADD DRUG ============
$("#add_drug").on("submit", function (event) {
  event.preventDefault();

  const formData = $(this).serializeArray();
  const data = {};
  $.map(formData, function (n) {
    data[n.name] = n.value;
  });

  $.ajax({
    url: `${baseURL}/api/drugs`,
    method: "POST",
    data: data,
  })
    .done(function (response) {
      alert(`${data.name} added successfully!`);
      window.location.href = "/manage";
    })
    .fail(function (err) {
      console.error("Add error:", err);
      alert("Error adding drug: " + (err.responseJSON?.message || err.responseText));
    });
});

// ============ UPDATE DRUG ============
$("#update_drug").on("submit", function (event) {
  event.preventDefault();

  const formData = $(this).serializeArray();
  const data = {};
  $.map(formData, function (n) {
    data[n.name] = n.value;
  });

  $.ajax({
    url: `${baseURL}/api/drugs/${data.id}`,
    method: "PUT",
    data: data,
  })
    .done(function (response) {
      alert(`${data.name} updated successfully!`);
      window.location.href = "/manage";
    })
    .fail(function (err) {
      console.error("Update error:", err);
      alert("Error updating drug: " + (err.responseJSON?.message || err.responseText));
    });
});

// ============ DELETE DRUG ============
if (window.location.pathname === "/manage") {
  $("table tbody").on("click", "a.delete", function (e) {
    e.preventDefault();
    const id = $(this).attr("data-id");

    if (confirm("Do you really want to delete this drug?")) {
      $.ajax({
        url: `${baseURL}/api/drugs/${id}`,
        method: "DELETE",
      })
        .done(function (response) {
          alert(response.message || "Drug deleted successfully!");
          location.reload();
        })
        .fail(function (err) {
          console.error("Delete error:", err);
          alert("Error deleting drug: " + (err.responseJSON?.message || err.responseText));
        });
    }
  });
}

// ============ PURCHASE FUNCTION ============
if (window.location.pathname === "/purchase") {
  $("#drug_days").on("submit", function (event) {
    event.preventDefault();

    const days = +$("#days").val() || 30;
    $("#purchase_table").show();

    alert(`Drugs calculated for ${days} days!`);
  });
}
