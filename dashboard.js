$(function () {
    //Json data by api call for order table
    $.get(orderListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, order) {
                totalCost += parseFloat(order.total);
                table += '<tr>' +
                    '<td>'+ order.datetime +'</td>'+
                    '<td>'+ order.order_id +'</td>'+
                    '<td>'+ order.customer_name +'</td>'+
                    '<td>'+ order.total.toFixed(2) +' Rs</td>'+
                    '<td>' +
                        '<button type="button" class="btn btn-sm btn-primary" onclick="viewBill('+ order.order_id +')">View Bill</button>'
 +
                    '</td>' +
                '</tr>';
            });
            table += '<tr><td colspan="4" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});

// temporary function (next step me real bill banayenge)
function viewBill(order_id) {
    $.get("http://127.0.0.1:5000/getOrderDetails/" + order_id, function(response) {
        localStorage.setItem("billData", JSON.stringify(response));
        window.location.href = "invoice.html";
    });
}
