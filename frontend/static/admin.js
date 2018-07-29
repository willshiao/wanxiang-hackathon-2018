var ctx = document.getElementById('myChart').getContext('2d');
data = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: {}
});