  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    once: true,
    easing: "ease-in-out",
  });

  // Set current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // send from
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    try {
      const response = await fetch("https://formspree.io/f/mldjobvr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // لو لم تكن الاستجابة ناجحة
      if (!response.ok) {
        const errorText = await response.text();     
        console.error("Error response:", errorText); 
        toast.textContent = "حدث خطأ أثناء الإرسال ";
        toast.style.background = "#ef4444"; 
        toast.classList.add("show");
      } else {
        // Success notification
        toast.textContent = "تم إرسال الرسالة بنجاح ";
        toast.style.background = "#2563eb"; 
        toast.classList.add("show");
        form.reset();
      }
    } catch (error) {
      // خطأ في الاتصال
      console.error("Network error:", error);
      toast.textContent = "فشل الاتصال بالخادم ";
      toast.style.background = "#ef4444"; 
      toast.classList.add("show");
    }

    // إزالة التوست بعد 5 ثواني
    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  });