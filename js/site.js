// Duplicate ticker group for seamless loop
    (function () {
      var track = document.getElementById('tickerTrack');
      track.appendChild(track.querySelector('.group').cloneNode(true));
    })();

    // Revenue chart bars
    (function () {
      var heights = [32, 45, 38, 58, 52, 68, 64, 78, 72, 86, 82, 96];
      var chart = document.getElementById('revenueChart');
      heights.forEach(function (h) {
        var bar = document.createElement('div');
        bar.style.height = h + '%';
        chart.appendChild(bar);
      });
    })();

    // Scroll reveal
    (function () {
      var els = document.querySelectorAll('.reveal');
      if (!('IntersectionObserver' in window)) {
        els.forEach(function (el) { el.classList.add('visible'); });
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      els.forEach(function (el) { io.observe(el); });
    })();

    // Open client review images in an accessible native lightbox
    (function () {
      var dialog = document.getElementById('proofLightbox');
      var enlargedImage = dialog && dialog.querySelector('img');
      var closeButton = dialog && dialog.querySelector('.proof-lightbox-close');
      if (!dialog || !enlargedImage || !closeButton || typeof dialog.showModal !== 'function') return;

      document.querySelectorAll('.proof-review a').forEach(function (link) {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          var thumbnail = link.querySelector('img');
          enlargedImage.src = link.href;
          enlargedImage.alt = thumbnail ? thumbnail.alt : link.getAttribute('aria-label');
          dialog.showModal();
        });
      });

      closeButton.addEventListener('click', function () { dialog.close(); });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && dialog.open) {
          event.preventDefault();
          dialog.close();
        }
      }, true);
      dialog.addEventListener('click', function (event) {
        if (event.target === dialog) dialog.close();
      });
      dialog.addEventListener('close', function () { enlargedImage.removeAttribute('src'); });
    })();

    // Prepare a prefilled email from the contact form
    (function () {
      var form = document.getElementById('contactForm');
      var status = document.getElementById('contactStatus');
      if (!form || !status) return;

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var values = new FormData(form);
        var senderName = String(values.get('name') || '').trim();
        var senderEmail = String(values.get('email') || '').trim();
        var projectType = String(values.get('project') || '').trim();
        var brief = String(values.get('brief') || '').trim();
        var subject = 'Copywriting enquiry from ' + senderName;
        var body = [
          'Name: ' + senderName,
          'Email: ' + senderEmail,
          'Project: ' + projectType,
          '',
          'Brief:',
          brief
        ].join('\n');

        window.location.href = 'mailto:zaki@zakiwrites.com?subject=' + encodeURIComponent(subject) +
          '&body=' + encodeURIComponent(body);
        status.textContent = 'Your email app should open with your brief ready to send.';
      });
    })();
