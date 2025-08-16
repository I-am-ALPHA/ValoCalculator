document.getElementById('calculateBtn').addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.skin-item input[type="checkbox"]');
  let total = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) total += parseInt(cb.getAttribute('data-vp'), 10);
  });

  const bpCount = parseInt(document.getElementById('bpCount').value, 10) || 0;
  const bpVp = bpCount * 1000; // 1,000 VP per Battle Pass
  total += bpVp;

  document.getElementById('totalVp').textContent = `${total.toLocaleString()} VP`;
});
