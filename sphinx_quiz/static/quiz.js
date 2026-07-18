/* sphinx_quiz client application — Kahoot-like full-screen quiz. */
(function () {
  "use strict";

  var STRINGS = {
    en: {
      question: "Question",
      of: "of",
      mixed: "Mix",
      all: "All",
      allCategory: "Mixed",
      categoryLabel: "Category",
      levelLabel: "Level",
      next: "Next question",
      results: "See results",
      correctTitle: "Correct!",
      wrongTitle: "Wrong!",
      timeout: "Time out",
      restart: "Play again",
      noQuestions: "No questions match this selection.",
      seconds: "s",
      submit: "Answer",
      multiHint: "Select every correct answer",
      byCategory: "By category",
      byLevel: "By level",
      record: "Best score",
      newRecord: "New best score!",
      review: "Review",
      share: "Share",
      copyLink: "Copy link",
      downloadImage: "Download image",
      linkCopied: "Link copied!",
      close: "Close",
      correctAnswer: "Correct answer",
      yourAnswer: "Your answer",
      off: "OFF",
    },
    es: {
      question: "Pregunta",
      of: "de",
      mixed: "Mix",
      all: "Todas",
      allCategory: "Mixto",
      categoryLabel: "Categoría",
      levelLabel: "Nivel",
      next: "Siguiente pregunta",
      results: "Ver resultados",
      correctTitle: "¡Correcto!",
      wrongTitle: "¡Incorrecto!",
      timeout: "Tiempo agotado",
      restart: "Jugar otra vez",
      noQuestions: "No hay preguntas para esta selección.",
      seconds: "s",
      submit: "Responder",
      multiHint: "Selecciona todas las respuestas correctas",
      byCategory: "Por categoría",
      byLevel: "Por nivel",
      record: "Récord",
      newRecord: "¡Nuevo récord!",
      review: "Repaso",
      share: "Compartir",
      copyLink: "Copiar enlace",
      downloadImage: "Descargar imagen",
      linkCopied: "¡Enlace copiado!",
      close: "Cerrar",
      correctAnswer: "Respuesta correcta",
      yourAnswer: "Tu respuesta",
      off: "OFF",
    },
  };

  /* Kahoot-like palette for categories and choice letters. */
  var PALETTE = ["#e21b3c", "#1368ce", "#d89e00", "#26890c", "#9c27b0", "#f4511e"];
  var LEVEL_COLORS = { easy: "#26890c", medium: "#d89e00", hard: "#e21b3c" };
  var LEVEL_ORDER = ["easy", "medium", "hard"];
  var MIXED_COLOR = "#9c27b0";
  var LETTERS = "ABCDEFGHIJ";

  function sortLevels(options) {
    var rank = function (value) {
      if (value === "all") return -1;
      var index = LEVEL_ORDER.indexOf(value);
      return index === -1 ? LEVEL_ORDER.length : index;
    };
    return options.slice().sort(function (a, b) {
      return rank(a) - rank(b);
    });
  }

  var ICONS = {
    timer:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/></svg>',
    cards:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13l5 5L20 7"/></svg>',
    cross:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    share:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="5" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.7 10.7l6.6-4.4M8.7 13.3l6.6 4.4"/></svg>',
    review:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
  };

  function shuffle(items) {
    var array = items.slice();
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    return array;
  }

  function weightedSample(pool, count, weightOf) {
    var items = pool.slice();
    var result = [];
    while (items.length && result.length < count) {
      var total = 0;
      for (var i = 0; i < items.length; i++) total += weightOf(items[i]);
      var r = Math.random() * total;
      var index = 0;
      for (; index < items.length - 1; index++) {
        r -= weightOf(items[index]);
        if (r <= 0) break;
      }
      result.push(items.splice(index, 1)[0]);
    }
    return result;
  }

  function sameSets(a, b) {
    if (a.length !== b.length) return false;
    var sortedA = a.slice().sort();
    var sortedB = b.slice().sort();
    return sortedA.every(function (value, i) {
      return value === sortedB[i];
    });
  }

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  var storage = {
    get: function (key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        /* private mode: no records */
      }
    },
  };

  function pad36(value) {
    var encoded = value.toString(36);
    return encoded.length < 2 ? "0" + encoded : encoded;
  }

  function scoreColor(percent) {
    if (percent < 50) return "#e21b3c";
    if (percent < 80) return "#d89e00";
    return "#26890c";
  }

  function Quiz(mount, data) {
    this.mount = mount;
    this.data = data;
    var lang = (data.language || "en").split("_")[0].split("-")[0];
    this.t = STRINGS[lang] || STRINGS.en;
    this.timerHandle = null;
    this.timeouts = [];
    document.body.classList.add("sq-app-active");

    var config = data.config;
    this.settings = {
      level: (config.level && config.level.default) || "all",
      category: null,
      count: parseInt((config["num-questions"] || {}).default, 10) || 10,
      timer: parseFloat((config.timer || {}).default) || 0,
    };

    var shared = new URLSearchParams(window.location.search).get("r");
    if (shared && this.loadShared(shared)) {
      this.showResults(true);
    } else {
      this.showSetup();
    }
  }

  Quiz.prototype.later = function (fn, ms) {
    this.timeouts.push(setTimeout(fn, ms));
  };

  Quiz.prototype.clear = function () {
    this.stopTimer();
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    this.mount.innerHTML = "";
  };

  Quiz.prototype.categoryColor = function (name) {
    if (name === "all") return MIXED_COLOR;
    var options = ((this.data.config.category || {}).options || []).filter(function (option) {
      return option !== "all";
    });
    return PALETTE[Math.max(0, options.indexOf(name)) % PALETTE.length];
  };

  Quiz.prototype.levelColor = function (name) {
    if (name === "all") return MIXED_COLOR;
    if (LEVEL_COLORS[name]) return LEVEL_COLORS[name];
    var options = ((this.data.config.level || {}).options || []).filter(function (option) {
      return option !== "all";
    });
    return PALETTE[Math.max(0, options.indexOf(name)) % PALETTE.length];
  };

  /* ---------------------------------------------------------------- setup */

  Quiz.prototype.showSetup = function () {
    this.clear();
    var t = this.t;
    var self = this;
    var config = this.data.config;
    var screen = el("div", "sq-screen sq-setup-screen");

    /* Typed terminal title. */
    var title = el("h1", "sq-typed");
    var prompt = el("span", "sq-typed-prompt", "&gt;&gt;&gt; ");
    var text = el("span", "sq-typed-text");
    var cursor = el("span", "sq-typed-cursor");
    title.appendChild(prompt);
    title.appendChild(text);
    title.appendChild(cursor);
    screen.appendChild(title);
    var full = this.data.project;
    var position = 0;
    var type = function () {
      text.textContent = full.slice(0, position++);
      if (position <= full.length) self.later(type, 45 + Math.random() * 70);
    };
    this.later(type, 350);

    /* Category card fan. */
    var categories = (config.category && config.category.options) || ["all"];
    var fan = el("div", "sq-fan");
    var spread = Math.min(14, 64 / Math.max(1, categories.length - 1));
    categories.forEach(function (category, i) {
      var card = el("button", "sq-fan-card");
      card.type = "button";
      var color = self.categoryColor(category);
      card.style.setProperty("--card-color", color);
      var angle = (i - (categories.length - 1) / 2) * spread;
      var lift = Math.abs(i - (categories.length - 1) / 2) * 14;
      card.style.setProperty("--card-rotate", angle + "deg");
      card.style.setProperty("--card-lift", lift + "px");
      card.style.animationDelay = 0.15 * i + "s";
      card.appendChild(el("span", "sq-fan-deco", "&gt;&gt;&gt;"));
      card.appendChild(
        el("span", "sq-fan-name", category === "all" ? self.t.allCategory : category)
      );
      card.addEventListener("click", function () {
        self.settings.category = category;
        self.start();
      });
      fan.appendChild(card);
    });
    screen.appendChild(fan);

    /* Level chips: Mix first, then easy → medium → hard. */
    var levels = sortLevels((config.level && config.level.options) || []);
    if (levels.length) {
      var chips = el("div", "sq-chips");
      levels.forEach(function (level) {
        var chip = el("button", "sq-chip", level === "all" ? t.mixed : level);
        chip.type = "button";
        chip.style.setProperty("--chip-color", self.levelColor(level));
        if (level === self.settings.level) chip.classList.add("sq-chip-active");
        chip.addEventListener("click", function () {
          self.settings.level = level;
          chips.querySelectorAll(".sq-chip").forEach(function (other) {
            other.classList.remove("sq-chip-active");
          });
          chip.classList.add("sq-chip-active");
        });
        chips.appendChild(chip);
      });
      screen.appendChild(chips);
    }

    /* Corner cycling selectors: number of questions + timer. */
    var corner = el("div", "sq-corner");
    var countOptions = ((config["num-questions"] || {}).options || ["10"]).map(Number);
    corner.appendChild(
      this.cycleControl(ICONS.cards, countOptions, this.settings.count, function (value) {
        self.settings.count = value;
        return String(value);
      })
    );
    var timerOptions = ((config.timer || {}).options || ["0"]).map(Number);
    corner.appendChild(
      this.cycleControl(ICONS.timer, timerOptions, this.settings.timer, function (value) {
        self.settings.timer = value;
        return value === 0 ? t.off : "×" + value;
      })
    );
    screen.appendChild(corner);

    this.mount.appendChild(screen);
  };

  Quiz.prototype.cycleControl = function (icon, options, current, apply) {
    var control = el("button", "sq-cycle");
    control.type = "button";
    var iconWrap = el("span", "sq-cycle-icon", icon);
    var label = el("span", "sq-cycle-value");
    control.appendChild(iconWrap);
    control.appendChild(label);
    var index = Math.max(0, options.indexOf(current));
    label.textContent = apply(options[index]);
    control.addEventListener("click", function () {
      index = (index + 1) % options.length;
      label.textContent = apply(options[index]);
      control.classList.remove("sq-cycle-tick");
      void control.offsetWidth;
      control.classList.add("sq-cycle-tick");
    });
    return control;
  };

  /* ----------------------------------------------------------------- game */

  Quiz.prototype.start = function () {
    var settings = this.settings;
    this.multiplier = settings.timer;
    this.gameKey = [
      "sphinx-quiz-best",
      settings.level,
      settings.category,
      settings.count,
      settings.timer,
    ].join(":");

    var pool = this.data.questions.filter(function (question) {
      return (
        (settings.level === "all" || question.level === settings.level) &&
        (settings.category === "all" || question.category === settings.category)
      );
    });
    if (!pool.length) {
      this.showEmpty();
      return;
    }
    var weights = (this.data.config.level || {}).weights;
    if (settings.level === "all" && weights) {
      this.questions = weightedSample(pool, settings.count, function (question) {
        var weight = weights[question.level];
        return weight === undefined ? 1 : weight;
      });
    } else {
      this.questions = shuffle(pool).slice(0, settings.count);
    }
    this.index = 0;
    this.answers = [];
    this.showQuestion();
  };

  Quiz.prototype.showEmpty = function () {
    this.clear();
    var self = this;
    var screen = el("div", "sq-screen sq-empty-screen");
    screen.appendChild(el("p", "sq-empty", this.t.noQuestions));
    var back = el("button", "sq-btn", this.t.restart);
    back.addEventListener("click", function () {
      self.showSetup();
    });
    screen.appendChild(back);
    this.mount.appendChild(screen);
  };

  /* Home link styled like the cover title: static cursor, blinks on hover. */
  Quiz.prototype.brand = function () {
    var self = this;
    var brand = el("button", "sq-brand");
    brand.type = "button";
    brand.appendChild(el("span", "sq-typed-prompt", "&gt;&gt;&gt; "));
    brand.appendChild(el("span", "sq-brand-text", this.data.project));
    brand.appendChild(el("span", "sq-typed-cursor sq-cursor-static"));
    brand.addEventListener("click", function () {
      window.history.replaceState(null, "", window.location.pathname);
      self.showSetup();
    });
    return brand;
  };

  Quiz.prototype.showQuestion = function () {
    this.clear();
    var t = this.t;
    var self = this;
    var question = this.questions[this.index];
    var multi = question.correct.length > 1;
    var screen = el("div", "sq-screen sq-question-screen");
    screen.appendChild(this.brand());

    /* Center stage: question number intro, later replaced by verdict. */
    var stage = el("div", "sq-stage");
    var intro = el("div", "sq-stage-intro");
    intro.appendChild(el("div", "sq-stage-word", t.question));
    intro.appendChild(
      el("div", "sq-stage-count", this.index + 1 + " " + t.of + " " + this.questions.length)
    );
    stage.appendChild(intro);
    screen.appendChild(stage);
    this.stage = stage;

    var content = el("div", "sq-question-content");
    this.titleEl = el("h2", "sq-question-title", question.title);
    content.appendChild(this.titleEl);
    if (question.body) content.appendChild(el("div", "sq-question-body", question.body));
    if (multi) content.appendChild(el("p", "sq-multi-hint", t.multiHint));

    var order = question.choices.map(function (_, i) {
      return i;
    });
    if (question.randomize) order = shuffle(order);
    var list = el("div", "sq-options");
    this.choiceButtons = [];
    this.selection = [];
    order.forEach(function (originalIndex, position) {
      var card = el("button", "sq-opt");
      card.type = "button";
      var letter = el("span", "sq-opt-letter", LETTERS[position] || "?");
      letter.style.background = PALETTE[position % PALETTE.length];
      card.appendChild(letter);
      card.appendChild(el("div", "sq-opt-text", question.choices[originalIndex]));
      card.dataset.original = originalIndex;
      card.style.animationDelay = 0.12 * position + "s";
      card.addEventListener("click", function () {
        if (multi) self.toggle(card, originalIndex);
        else self.finish([originalIndex]);
      });
      list.appendChild(card);
      self.choiceButtons.push(card);
    });
    content.appendChild(list);

    if (multi) {
      this.submitButton = el("button", "sq-btn sq-btn-primary sq-submit", t.submit);
      this.submitButton.type = "button";
      this.submitButton.disabled = true;
      this.submitButton.addEventListener("click", function () {
        self.finish(self.selection.slice());
      });
      content.appendChild(this.submitButton);
    }
    this.feedback = el("div", "sq-feedback");
    content.appendChild(this.feedback);
    screen.appendChild(content);
    this.content = content;
    this.screen = screen;

    /* Footer time bar. */
    if (this.multiplier > 0) {
      var foot = el("div", "sq-footbar");
      this.timerBar = el("div", "sq-footbar-fill");
      foot.appendChild(this.timerBar);
      this.timerLabel = el("div", "sq-footbar-label");
      screen.appendChild(this.timerLabel);
      screen.appendChild(foot);
    }

    this.mount.appendChild(screen);
    this.answered = false;
    this.remainingFraction = 1;

    this.keyHandler = function (event) {
      if (self.answered) return;
      var key = event.key.toUpperCase();
      var byLetter = LETTERS.indexOf(key);
      var byNumber = parseInt(event.key, 10) - 1;
      var position = byLetter !== -1 && key.length === 1 ? byLetter : byNumber;
      if (position >= 0 && position < self.choiceButtons.length) {
        self.choiceButtons[position].click();
      } else if (multi && event.key === "Enter" && self.selection.length) {
        event.preventDefault();
        self.submitButton.click();
      }
    };
    document.addEventListener("keydown", this.keyHandler);

    /* Sequence: intro center → dock to top → reveal content → start timer. */
    this.later(function () {
      stage.classList.add("sq-docked");
    }, 1100);
    this.later(function () {
      content.classList.add("sq-revealed");
      if (self.multiplier > 0) {
        self.totalSeconds = question.seconds * self.multiplier;
        self.later(function () {
          self.startTimer();
        }, 500);
      }
    }, 1500);
  };

  Quiz.prototype.toggle = function (card, originalIndex) {
    var position = this.selection.indexOf(originalIndex);
    if (position === -1) this.selection.push(originalIndex);
    else this.selection.splice(position, 1);
    card.classList.toggle("sq-opt-selected", position === -1);
    this.submitButton.disabled = !this.selection.length;
  };

  Quiz.prototype.startTimer = function () {
    var self = this;
    this.startedAt = Date.now();
    this.remainingFraction = 1;
    var tick = function () {
      var elapsed = (Date.now() - self.startedAt) / 1000;
      var remaining = Math.max(0, self.totalSeconds - elapsed);
      var fraction = remaining / self.totalSeconds;
      self.remainingFraction = fraction;
      self.timerBar.style.width = fraction * 100 + "%";
      /* The bar grows taller as time runs out, to catch the eye. */
      var height = 5 + (1 - fraction) * 12;
      self.timerBar.parentElement.style.height = height + "px";
      self.timerBar.classList.toggle("sq-footbar-low", fraction < 0.25);
      self.timerLabel.textContent = Math.ceil(remaining) + self.t.seconds;
      if (remaining <= 0) self.finish(null);
    };
    tick();
    this.timerHandle = setInterval(tick, 100);
  };

  Quiz.prototype.stopTimer = function () {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
      this.timerHandle = null;
    }
    if (this.keyHandler) {
      document.removeEventListener("keydown", this.keyHandler);
      this.keyHandler = null;
    }
  };

  /* `selection`: original choice indexes, or null on timeout. */
  Quiz.prototype.finish = function (selection) {
    if (this.answered) return;
    this.answered = true;
    var t = this.t;
    var self = this;
    var question = this.questions[this.index];
    var timerOn = this.multiplier > 0;
    var remaining = timerOn ? this.remainingFraction : null;
    this.stopTimer();
    if (this.timerBar) this.timerBar.parentElement.style.opacity = "0";
    if (this.timerLabel) this.timerLabel.style.opacity = "0";

    var success = selection !== null && sameSets(selection, question.correct);
    this.answers.push({
      question: question,
      qIndex: this.data.questions.indexOf(question),
      selected: selection === null ? [] : selection.slice(),
      success: success,
    });

    /* Card verdict colors. */
    var multi = question.correct.length > 1;
    this.choiceButtons.forEach(function (card) {
      card.disabled = true;
      var original = parseInt(card.dataset.original, 10);
      var isCorrect = question.correct.indexOf(original) !== -1;
      var isSelected = selection !== null && selection.indexOf(original) !== -1;
      if (isCorrect && isSelected) card.classList.add("sq-opt-right");
      else if (isCorrect && multi && selection !== null && selection.length) {
        card.classList.add("sq-opt-missed"); /* forgotten in a multi question */
      } else if (isCorrect) card.classList.add("sq-opt-right");
      else if (isSelected) card.classList.add("sq-opt-wrong");
      else card.classList.add("sq-opt-dim");
    });

    /* Swap the stage number for the verdict + icon. */
    var status = success ? "success" : "failure";
    var transition = this.pickTransition(status, remaining, timerOn);
    var stage = this.stage;
    stage.classList.add("sq-stage-swap");
    this.later(function () {
      stage.innerHTML = "";
      /* Enter small and pinned to the top (repositioned while still at
         opacity 0, then faded in) so the verdict never pokes offscreen. */
      stage.classList.remove("sq-docked");
      stage.classList.add("sq-verdict-enter");
      var verdict = el("div", "sq-verdict sq-verdict-" + status);
      verdict.appendChild(
        el("div", "sq-verdict-icon", success ? ICONS.check : ICONS.cross)
      );
      var title =
        (transition && transition.title) ||
        (selection === null ? t.timeout : success ? t.correctTitle : t.wrongTitle);
      verdict.appendChild(el("div", "sq-verdict-title", title));
      if (transition && transition.body) {
        verdict.appendChild(el("div", "sq-verdict-body", transition.body));
      }
      stage.appendChild(verdict);
      stage.classList.remove("sq-stage-swap");
    }, 250);

    /* One coordinated step: the verdict grows into place while the
       title, the body and the irrelevant cards collapse, and the block
       moves straight to its final spot below the verdict.  The final
       position is computed upfront (verdict height is already final)
       so nothing ever overlaps mid-flight. */
    this.later(function () {
      stage.classList.remove("sq-verdict-enter");
      stage.classList.add("sq-stage-verdict");
      var verdictTop =
        window.innerHeight <= 700
          ? 40
          : Math.min(Math.max(72, window.innerHeight * 0.12), 128);
      var top = verdictTop + stage.offsetHeight + 16;
      self.content.style.marginTop = top + "px";
      self.content.style.maxHeight = window.innerHeight - top - 16 + "px";

      self.screen.classList.add("sq-post");
      var remove = function (element) {
        element.classList.add("sq-gone");
        self.later(function () {
          element.style.display = "none";
        }, 500);
      };
      remove(self.titleEl);
      if (self.submitButton) remove(self.submitButton);
      self.choiceButtons.forEach(function (card) {
        if (card.classList.contains("sq-opt-dim")) remove(card);
      });
    }, 700);

    /* Explanation, then the next button. */
    this.later(function () {
      if (question.explanation) {
        var explanation = el(
          "div",
          "sq-explanation sq-appear sq-scroll",
          question.explanation
        );
        self.feedback.appendChild(explanation);
      }
    }, 1200);
    this.later(function () {
      var last = self.index + 1 >= self.questions.length;
      var next = el(
        "button",
        "sq-btn sq-btn-primary sq-appear",
        last ? t.results : t.next
      );
      next.addEventListener("click", function () {
        if (last) self.showResults(false);
        else {
          self.index++;
          self.showQuestion();
        }
      });
      self.feedback.appendChild(next);
      next.focus({ preventScroll: true });
    }, 1700);
  };

  Quiz.prototype.pickTransition = function (status, remainingFraction, timerOn) {
    var pool = this.data.transitions.filter(function (transition) {
      return transition.status === status;
    });
    var defaults = pool.filter(function (transition) {
      return transition.time_remaining === null || transition.time_remaining === undefined;
    });
    var candidates = defaults;
    if (timerOn) {
      if (remainingFraction <= 0) {
        var timeouts = pool.filter(function (transition) {
          return transition.time_remaining === 0;
        });
        if (timeouts.length) candidates = timeouts;
      } else {
        var timed = pool.filter(function (transition) {
          return (
            transition.time_remaining != null &&
            transition.time_remaining > 0 &&
            remainingFraction >= transition.time_remaining
          );
        });
        if (timed.length) {
          var best = Math.max.apply(
            null,
            timed.map(function (transition) {
              return transition.time_remaining;
            })
          );
          candidates = timed.filter(function (transition) {
            return transition.time_remaining === best;
          });
        }
      }
    }
    if (!candidates.length) candidates = defaults;
    if (!candidates.length) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
  };

  /* ---------------------------------------------------------- share codec */

  Quiz.prototype.encodeResults = function () {
    return this.answers
      .map(function (answer) {
        var mask = answer.selected.reduce(function (bits, index) {
          return bits | (1 << index);
        }, 0);
        return pad36(answer.qIndex) + pad36(mask);
      })
      .join("");
  };

  Quiz.prototype.loadShared = function (encoded) {
    if (!/^[0-9a-z]+$/.test(encoded) || encoded.length % 4) return false;
    var answers = [];
    for (var i = 0; i < encoded.length; i += 4) {
      var qIndex = parseInt(encoded.slice(i, i + 2), 36);
      var mask = parseInt(encoded.slice(i + 2, i + 4), 36);
      var question = this.data.questions[qIndex];
      if (!question) return false;
      var selected = [];
      for (var bit = 0; bit < question.choices.length; bit++) {
        if (mask & (1 << bit)) selected.push(bit);
      }
      answers.push({
        question: question,
        qIndex: qIndex,
        selected: selected,
        success: sameSets(selected, question.correct),
      });
    }
    if (!answers.length) return false;
    this.answers = answers;
    this.questions = answers.map(function (answer) {
      return answer.question;
    });
    this.gameKey = null;
    return true;
  };

  /* -------------------------------------------------------------- results */

  Quiz.prototype.breakdown = function (key) {
    var groups = {};
    this.answers.forEach(function (answer) {
      var value = answer.question[key];
      if (!value) return;
      if (!groups[value]) groups[value] = { hits: 0, total: 0 };
      groups[value].total++;
      if (answer.success) groups[value].hits++;
    });
    return groups;
  };

  Quiz.prototype.breakdownBlock = function (title, groups, names) {
    if (names.length < 2) return null;
    var block = el("div", "sq-breakdown");
    block.appendChild(el("h3", "sq-breakdown-title", title));
    names.forEach(function (name) {
      var group = groups[name];
      var row = el("div", "sq-breakdown-row");
      row.appendChild(el("span", "sq-breakdown-name", name));
      var bar = el("div", "sq-breakdown-bar");
      var fill = el("div", "sq-breakdown-fill");
      fill.style.width = (group.hits / group.total) * 100 + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      row.appendChild(el("span", "sq-breakdown-count", group.hits + "/" + group.total));
      block.appendChild(row);
    });
    return block;
  };

  Quiz.prototype.pickPodium = function (percent) {
    var podiums = this.data.podiums || [];
    var chosen = null;
    podiums.forEach(function (podium) {
      if (percent >= podium.percentage) chosen = podium;
    });
    return chosen;
  };

  Quiz.prototype.showResults = function (shared) {
    this.clear();
    var t = this.t;
    var self = this;
    var hits = this.answers.filter(function (answer) {
      return answer.success;
    }).length;
    var total = this.answers.length;
    var percent = total ? Math.round((hits / total) * 100) : 0;
    var color = scoreColor(percent);

    var screen = el("div", "sq-screen sq-results-screen");
    screen.appendChild(this.brand());
    var grid = el("div", "sq-results-grid");

    /* Left: bare score ring with the game settings at its side. */
    var left = el("div", "sq-results-left");
    var top = el("div", "sq-results-top");
    var radius = 70;
    var circumference = 2 * Math.PI * radius;
    var ring = el("div", "sq-ring");
    ring.innerHTML =
      '<svg viewBox="0 0 180 180">' +
      '<circle class="sq-ring-track" cx="90" cy="90" r="' + radius + '"/>' +
      '<circle class="sq-ring-fill" cx="90" cy="90" r="' + radius + '"' +
      ' style="stroke:' + color + ";stroke-dasharray:" + circumference +
      ";stroke-dashoffset:" + circumference + '"/>' +
      "</svg>";
    var center = el("div", "sq-ring-center");
    center.appendChild(el("div", "sq-ring-score", hits + "/" + total));
    center.style.color = color;
    ring.appendChild(center);
    top.appendChild(ring);
    this.later(function () {
      var fill = ring.querySelector(".sq-ring-fill");
      fill.style.strokeDashoffset = circumference * (1 - percent / 100);
    }, 300);

    if (!shared) {
      var settings = this.settings;
      var info = el("div", "sq-results-info");
      var categoryRow = el("div", "sq-info-row");
      categoryRow.appendChild(el("span", "sq-info-label", t.categoryLabel + ":"));
      var categoryCard = el(
        "span",
        "sq-info-card",
        settings.category === "all" ? t.allCategory : settings.category
      );
      categoryCard.style.setProperty("--card-color", this.categoryColor(settings.category));
      categoryRow.appendChild(categoryCard);
      info.appendChild(categoryRow);

      var levelRow = el("div", "sq-info-row");
      levelRow.appendChild(el("span", "sq-info-label", t.levelLabel + ":"));
      var levelChip = el(
        "span",
        "sq-chip sq-info-chip",
        settings.level === "all" ? t.mixed : settings.level
      );
      levelChip.style.setProperty("--chip-color", this.levelColor(settings.level));
      info.appendChild(levelRow);
      levelRow.appendChild(levelChip);

      var timerRow = el("div", "sq-info-row sq-info-timer");
      timerRow.innerHTML =
        ICONS.timer + "<span>" + (settings.timer === 0 ? t.off : "×" + settings.timer) + "</span>";
      info.appendChild(timerRow);
      top.appendChild(info);
    }
    left.appendChild(top);

    if (!shared && this.gameKey) {
      var previousBest = parseInt(storage.get(this.gameKey), 10);
      var isRecord = isNaN(previousBest) || percent > previousBest;
      if (isRecord) storage.set(this.gameKey, String(percent));
      if (isRecord && !isNaN(previousBest)) {
        left.appendChild(el("p", "sq-record sq-record-new", t.newRecord));
      } else if (!isNaN(previousBest)) {
        left.appendChild(el("p", "sq-record", t.record + ": " + previousBest + "%"));
      }
    }

    var categories = this.breakdown("category");
    var byCategory = this.breakdownBlock(t.byCategory, categories, Object.keys(categories));
    if (byCategory) left.appendChild(byCategory);
    var levels = this.breakdown("level");
    var byLevel = this.breakdownBlock(t.byLevel, levels, sortLevels(Object.keys(levels)));
    if (byLevel) left.appendChild(byLevel);
    grid.appendChild(left);

    /* Right: podium gag with its headline. */
    var podium = this.pickPodium(percent);
    if (podium) {
      var right = el("div", "sq-results-right");
      if (podium.title) right.appendChild(el("h3", "sq-podium-title", podium.title));
      if (podium.image) {
        var image = document.createElement("img");
        image.src = podium.image;
        image.alt = "";
        image.className = "sq-podium-image";
        right.appendChild(image);
      }
      if (podium.text) right.appendChild(el("p", "sq-podium-text", podium.text));
      grid.appendChild(right);
    }

    screen.appendChild(grid);

    /* Actions centered under everything. */
    var actions = el("div", "sq-actions");
    var share = el("button", "sq-btn sq-btn-icon", ICONS.share + "<span>" + t.share + "</span>");
    share.addEventListener("click", function () {
      self.toggleShareMenu(share, percent, hits, total);
    });
    actions.appendChild(share);
    var review = el("button", "sq-btn sq-btn-icon", ICONS.review + "<span>" + t.review + "</span>");
    review.addEventListener("click", function () {
      self.showReviewModal();
    });
    actions.appendChild(review);
    var restart = el("button", "sq-btn sq-btn-primary", t.restart);
    restart.addEventListener("click", function () {
      window.history.replaceState(null, "", window.location.pathname);
      self.showSetup();
    });
    actions.appendChild(restart);
    screen.appendChild(actions);
    this.mount.appendChild(screen);
  };

  Quiz.prototype.toggleShareMenu = function (anchor, percent, hits, total) {
    var t = this.t;
    var self = this;
    var existing = this.mount.querySelector(".sq-share-menu");
    if (existing) {
      existing.remove();
      return;
    }
    var menu = el("div", "sq-share-menu");
    var link = el("button", "sq-share-item", t.copyLink);
    link.addEventListener("click", function () {
      var url =
        window.location.origin === "null"
          ? window.location.href.split("?")[0] + "?r=" + self.encodeResults()
          : window.location.origin + window.location.pathname + "?r=" + self.encodeResults();
      var done = function () {
        link.textContent = t.linkCopied;
        self.later(function () {
          menu.remove();
        }, 900);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () {
          window.prompt(t.copyLink, url);
          done();
        });
      } else {
        window.prompt(t.copyLink, url);
        done();
      }
    });
    menu.appendChild(link);
    var image = el("button", "sq-share-item", t.downloadImage);
    image.addEventListener("click", function () {
      self.downloadImage(percent, hits, total);
      menu.remove();
    });
    menu.appendChild(image);
    anchor.parentElement.appendChild(menu);
  };

  Quiz.prototype.downloadImage = function (percent, hits, total) {
    var self = this;
    var canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    var context = canvas.getContext("2d");
    var color = scoreColor(percent);

    /* Fixed, non-overlapping zones: header (y<110), ring on the left
       (y 180-420), bars on the right (y 170-420), podium strip at the
       bottom (y 460-620). */
    context.fillStyle = "#0d1319";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#ffd43b";
    context.font = "bold 38px monospace";
    context.fillText(">>> ", 60, 85);
    context.fillStyle = "#e8edf4";
    context.fillText(this.data.project, 150, 85);

    var cx = 210;
    var cy = 295;
    var radius = 105;
    context.lineWidth = 24;
    context.lineCap = "round";
    context.strokeStyle = "#232f40";
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.stroke();
    context.strokeStyle = color;
    context.beginPath();
    context.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * percent) / 100);
    context.stroke();
    context.fillStyle = color;
    context.font = "bold 56px monospace";
    context.textAlign = "center";
    context.fillText(hits + "/" + total, cx, cy + 18);
    context.textAlign = "left";

    var groups = this.breakdown("category");
    var y = 190;
    Object.keys(groups).slice(0, 5).forEach(function (name) {
      var group = groups[name];
      context.fillStyle = "#8fa1b8";
      context.font = "24px monospace";
      context.fillText(name, 460, y + 8);
      context.fillStyle = "#232f40";
      context.fillRect(660, y - 8, 380, 18);
      context.fillStyle = "#4b8bbe";
      context.fillRect(660, y - 8, (380 * group.hits) / group.total, 18);
      context.fillStyle = "#8fa1b8";
      context.fillText(group.hits + "/" + group.total, 1058, y + 8);
      y += 46;
    });

    var podium = this.pickPodium(percent);
    var finish = function () {
      if (podium) {
        var textX = podium.image ? 230 : 70;
        if (podium.title) {
          context.fillStyle = "#e8edf4";
          context.font = "bold 32px monospace";
          context.fillText(podium.title, textX, 510);
        }
        if (podium.text) {
          context.fillStyle = "#8fa1b8";
          context.font = "italic 25px sans-serif";
          var words = podium.text.split(" ");
          var line = "";
          var textY = podium.title ? 550 : 520;
          words.forEach(function (word) {
            if (context.measureText(line + word).width > 880) {
              context.fillText(line, textX, textY);
              textY += 34;
              line = "";
            }
            line += word + " ";
          });
          context.fillText(line, textX, textY);
        }
      }
      canvas.toBlob(function (blob) {
        var anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(blob);
        anchor.download = "quiz-results.png";
        anchor.click();
        URL.revokeObjectURL(anchor.href);
      });
    };

    if (podium && podium.image) {
      var image = new Image();
      image.onload = function () {
        try {
          context.drawImage(image, 60, 465, 140, 140);
        } catch (error) {
          /* tainted canvas on file://: skip the drawing */
        }
        finish();
      };
      image.onerror = finish;
      image.src = podium.image;
    } else {
      finish();
    }
  };

  Quiz.prototype.showReviewModal = function () {
    var t = this.t;
    var self = this;
    var overlay = el("div", "sq-modal-overlay");
    var modal = el("div", "sq-modal");
    var head = el("div", "sq-modal-head");
    head.appendChild(el("h3", "sq-modal-title", t.review));
    var close = el("button", "sq-modal-close", ICONS.cross);
    close.setAttribute("aria-label", t.close);
    close.addEventListener("click", function () {
      overlay.remove();
    });
    head.appendChild(close);
    modal.appendChild(head);

    var body = el("div", "sq-modal-body");
    this.answers.forEach(function (answer, index) {
      var question = answer.question;
      var item = el("div", "sq-modal-item");
      var head = el(
        "div",
        "sq-modal-item-title " + (answer.success ? "sq-ok" : "sq-ko"),
        (answer.success ? ICONS.check : ICONS.cross) +
          "<span>" + (index + 1) + ". </span>" + question.title
      );
      item.appendChild(head);
      var multi = question.correct.length > 1;
      question.choices.forEach(function (choice, choiceIndex) {
        var isCorrect = question.correct.indexOf(choiceIndex) !== -1;
        var isSelected = answer.selected.indexOf(choiceIndex) !== -1;
        if (!isCorrect && !isSelected) return;
        var row = el("div", "sq-modal-choice", choice);
        if (isCorrect && isSelected) row.classList.add("sq-modal-choice-right");
        else if (isCorrect && multi && answer.selected.length) {
          row.classList.add("sq-modal-choice-missed");
        } else if (isCorrect) row.classList.add("sq-modal-choice-right");
        else row.classList.add("sq-modal-choice-wrong");
        row.title = isCorrect ? t.correctAnswer : t.yourAnswer;
        item.appendChild(row);
      });
      if (question.explanation) {
        item.appendChild(el("div", "sq-explanation", question.explanation));
      }
      body.appendChild(item);
    });
    modal.appendChild(body);
    overlay.appendChild(modal);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) overlay.remove();
    });
    this.mount.appendChild(overlay);
  };

  document.addEventListener("DOMContentLoaded", function () {
    var mount = document.getElementById("sphinx-quiz-app");
    if (mount && window.SPHINX_QUIZ_DATA) {
      window.sphinxQuiz = new Quiz(mount, window.SPHINX_QUIZ_DATA);
    }
  });
})();
