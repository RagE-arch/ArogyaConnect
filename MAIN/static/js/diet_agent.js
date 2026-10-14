/**
 * AarogyaConnect 360 - Personalized Diet & Meal Analysis Agent
 * Satisfies Patient Req 4
 */

const DietAgent = {
  dietData: null,

  async init() {
    try {
      const res = await fetch('/api/patient/diet');
      this.dietData = await res.json();
      this.renderDietPlan();
    } catch (e) {
      console.warn("Failed to load diet plan:", e);
    }
  },

  renderDietPlan() {
    if (!this.dietData) return;

    const targetEl = document.getElementById('diet-condition-target');
    const mealsListEl = document.getElementById('diet-meals-schedule-list');
    const restrictionsEl = document.getElementById('diet-strict-restrictions-list');

    if (targetEl) {
      targetEl.innerText = this.dietData.condition_target;
    }

    if (restrictionsEl && this.dietData.strict_restrictions) {
      restrictionsEl.innerHTML = this.dietData.strict_restrictions.map(r => `
        <li class="flex items-start gap-2 text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
          <span class="font-bold text-red-600">⛔</span>
          <span>${r}</span>
        </li>
      `).join('');
    }

    if (mealsListEl && this.dietData.meals) {
      mealsListEl.innerHTML = this.dietData.meals.map(meal => `
        <div class="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">
                ${meal.time}
              </span>
              <h5 class="font-bold text-slate-900 text-sm">${meal.meal}</h5>
            </div>
            <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              ${meal.nutrients}
            </span>
          </div>

          <p class="text-sm font-semibold text-slate-800">${meal.title}</p>
          <p class="text-xs text-slate-500 leading-relaxed"><strong class="text-slate-700">Health Benefit:</strong> ${meal.benefits}</p>
        </div>
      `).join('');
    }
  },

  async checkMealItem(foodName) {
    const query = foodName || document.getElementById('food-search-input')?.value;
    if (!query || !query.trim()) return;

    const resultBox = document.getElementById('food-analysis-result-box');
    if (resultBox) {
      resultBox.classList.remove('hidden');
      resultBox.innerHTML = `<div class="p-4 text-center text-slate-500 text-xs">Analyzing nutritional safety for Diabetes & Lactose allergy...</div>`;
    }

    try {
      const res = await fetch('/api/patient/diet/check_meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ food_name: query.trim() })
      });

      const analysis = await res.json();
      this.renderMealAnalysisResult(analysis);
    } catch (e) {
      if (resultBox) resultBox.innerHTML = `<div class="p-4 text-red-500 text-xs">Analysis failed.</div>`;
    }
  },

  renderMealAnalysisResult(res) {
    const resultBox = document.getElementById('food-analysis-result-box');
    if (!resultBox) return;

    let badgeColor = 'bg-slate-100 text-slate-800';
    let borderColor = 'border-slate-200';

    if (res.safety_class === 'danger') {
      badgeColor = 'bg-red-100 text-red-800 border border-red-300';
      borderColor = 'border-red-300 bg-red-50/30';
    } else if (res.safety_class === 'warning') {
      badgeColor = 'bg-amber-100 text-amber-800 border border-amber-300';
      borderColor = 'border-amber-300 bg-amber-50/30';
    } else if (res.safety_class === 'success') {
      badgeColor = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
      borderColor = 'border-emerald-300 bg-emerald-50/30';
    }

    resultBox.innerHTML = `
      <div class="p-4 rounded-xl border ${borderColor} space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-slate-900 text-sm">Meal Verdict for: "${res.food_item}"</h4>
          <span class="badge-pill ${badgeColor} text-xs font-bold">${res.safety}</span>
        </div>

        <div class="text-xs space-y-1.5">
          <div class="font-semibold text-slate-700">Glycemic Index: <span class="font-bold text-sky-700">${res.glycemic_index}</span></div>
          <div class="p-2 rounded bg-white border border-slate-200 text-red-700 font-semibold">${res.allergy_warning}</div>
          <div class="p-2 rounded bg-white border border-slate-200 text-slate-700"><strong>Recommendation:</strong> ${res.recommendation}</div>
          <p class="text-slate-500 text-[11px]">${res.nutritional_summary}</p>
        </div>
      </div>
    `;
  }
};
